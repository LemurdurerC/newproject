import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, apikey, X-Admin-Password",
};

interface RSVPData {
  name: string;
  email: string;
  attendance: string;
  menu?: string;
  allergies?: string;
  carpooling: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // POST /rsvp - Save RSVP response
    if (req.method === "POST") {
      const rsvpData: RSVPData = await req.json();
      
      // Validate required fields
      if (!rsvpData.name || !rsvpData.email || !rsvpData.attendance) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Validate attendance value
      if (!['yes', 'no'].includes(rsvpData.attendance)) {
        return new Response(
          JSON.stringify({ error: "Invalid attendance value" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Validate menu if attendance is yes
      if (rsvpData.attendance === 'yes' && rsvpData.menu && !['classique', 'jardin'].includes(rsvpData.menu)) {
        return new Response(
          JSON.stringify({ error: "Invalid menu value" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Insert RSVP into database
      const { data, error } = await supabase
        .from('rsvps')
        .insert({
          name: rsvpData.name,
          email: rsvpData.email,
          attendance: rsvpData.attendance,
          menu: rsvpData.menu || null,
          allergies: rsvpData.allergies || null,
          carpooling: rsvpData.carpooling || 'no',
          message: rsvpData.message || null,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: "Failed to save RSVP", details: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "RSVP saved successfully",
          id: data.id 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // GET /rsvp - Get all RSVP responses (admin only)
    if (req.method === "GET") {
      // Check admin password via custom header
      const adminPassword = req.headers.get('X-Admin-Password');
      
      if (adminPassword !== 'AdminSimonTalia2026') {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Fetch all RSVPs
      const { data: rsvps, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch RSVPs", details: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Format dates for display
      const formattedRsvps = rsvps.map((rsvp: any) => ({
        ...rsvp,
        submitted_date: new Date(rsvp.submitted_at).toLocaleDateString('fr-FR'),
        submitted_time: new Date(rsvp.submitted_at).toLocaleTimeString('fr-FR'),
      }));

      // Calculate statistics
      const stats = {
        total: rsvps.length,
        attending: rsvps.filter((r: any) => r.attendance === 'yes').length,
        notAttending: rsvps.filter((r: any) => r.attendance === 'no').length,
        menuClassique: rsvps.filter((r: any) => r.menu === 'classique' && r.attendance === 'yes').length,
        menuJardin: rsvps.filter((r: any) => r.menu === 'jardin' && r.attendance === 'yes').length,
        carpooling: rsvps.filter((r: any) => r.carpooling === 'yes').length,
      };

      return new Response(
        JSON.stringify({ rsvps: formattedRsvps, stats }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Method not allowed
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});