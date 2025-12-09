import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.79.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    if (req.method === "POST") {
      const data = await req.json();
      const quizData: QuizData = data;

      if (!quizData.name || !quizData.email || quizData.score === undefined || !quizData.total_questions) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Missing Supabase credentials");
      }

      const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

      const { data: result, error } = await supabase
        .from("quizz")
        .insert([
          {
            name: quizData.name,
            email: quizData.email,
            score: quizData.score,
            total_questions: quizData.total_questions,
            answers: quizData.answers,
          },
        ])
        .select()
        .maybeSingle();

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Quiz saved successfully",
          id: result?.id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});