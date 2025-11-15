import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Admin-Password",
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

interface QuizData {
  name: string;
  email: string;
  score: number;
  total_questions: number;
  answers: string[];
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const mysql = await import("npm:mysql2@3.6.5/promise");
    const connection = await mysql.createConnection({
      host: "5.196.93.228",
      port: 4306,
      user: "admin",
      password: "kP7mL4z8XqT2",
      database: "mmocore",
    });

    const pathname = new URL(req.url).pathname;

    // POST - Save RSVP or Quiz
    if (req.method === "POST") {
      const data = await req.json();

      // Quiz endpoint
      if (pathname === "/rsvp-mysql/quiz") {
        const quizData: QuizData = data;

        if (!quizData.name || !quizData.email || quizData.score === undefined) {
          await connection.end();
          return new Response(
            JSON.stringify({ error: "Missing required fields" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        try {
          // Create table if it doesn't exist
          await connection.query(`
            CREATE TABLE IF NOT EXISTS quizz (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              score INT NOT NULL,
              total_questions INT NOT NULL,
              answers JSON NOT NULL,
              submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);

          const answersJson = JSON.stringify(quizData.answers);

          const [result] = await connection.execute(
            `INSERT INTO quizz (name, email, score, total_questions, answers)
             VALUES (?, ?, ?, ?, ?)`,
            [
              quizData.name,
              quizData.email,
              quizData.score,
              quizData.total_questions,
              answersJson,
            ]
          );

          await connection.end();

          return new Response(
            JSON.stringify({
              success: true,
              message: "Quiz saved successfully",
              id: (result as any).insertId
            }),
            {
              status: 200,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          console.error('Quiz insert error:', error);
          await connection.end();
          throw error;
        }
      }

      // RSVP endpoint
      const rsvpData: RSVPData = data;

      if (!rsvpData.name || !rsvpData.email || !rsvpData.attendance) {
        await connection.end();
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const [result] = await connection.execute(
        `INSERT INTO rsvps (name, email, attendance, menu, allergies, carpooling, message, submitted_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          rsvpData.name,
          rsvpData.email,
          rsvpData.attendance,
          rsvpData.menu || null,
          rsvpData.allergies || null,
          rsvpData.carpooling || 'no',
          rsvpData.message || null,
        ]
      );

      await connection.end();

      return new Response(
        JSON.stringify({
          success: true,
          message: "RSVP saved successfully",
          id: (result as any).insertId
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // GET - Fetch all RSVPs (admin only)
    if (req.method === "GET") {
      const adminPassword = req.headers.get('X-Admin-Password');

      if (adminPassword !== 'AdminSimonTalia2026') {
        await connection.end();
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const [rsvps] = await connection.query(
        `SELECT * FROM rsvps ORDER BY submitted_at DESC`
      );

      const formattedRsvps = (rsvps as any[]).map((rsvp: any) => ({
        ...rsvp,
        submitted_date: new Date(rsvp.submitted_at).toLocaleDateString('fr-FR'),
        submitted_time: new Date(rsvp.submitted_at).toLocaleTimeString('fr-FR'),
      }));

      const stats = {
        total: (rsvps as any[]).length,
        attending: (rsvps as any[]).filter((r: any) => r.attendance === 'yes').length,
        notAttending: (rsvps as any[]).filter((r: any) => r.attendance === 'no').length,
        menuClassique: (rsvps as any[]).filter((r: any) => r.menu === 'classique' && r.attendance === 'yes').length,
        menuJardin: (rsvps as any[]).filter((r: any) => r.menu === 'jardin' && r.attendance === 'yes').length,
        carpooling: (rsvps as any[]).filter((r: any) => r.carpooling === 'yes').length,
      };

      await connection.end();

      return new Response(
        JSON.stringify({ rsvps: formattedRsvps, stats }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    await connection.end();

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Error:', error);
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