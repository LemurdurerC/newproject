import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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

    const mysql = await import("npm:mysql2@3.6.5/promise");
    const connection = await mysql.createConnection({
      host: "5.196.93.228",
      port: 4306,
      user: "admin",
      password: "kP7mL4z8XqT2",
      database: "mmocore",
    });

    if (req.method === "POST") {
      const data = await req.json();
      const quizData: QuizData = data;

      if (!quizData.name || !quizData.email || quizData.score === undefined || !quizData.total_questions) {
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