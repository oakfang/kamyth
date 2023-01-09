import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ftjstzofrsbvccvvbojm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0anN0em9mcnNidmNjdnZib2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTEwNTIsImV4cCI6MTk4ODg2NzA1Mn0.cDp_gjDXXwq7bNNEBLGkkaQrchuM0x2sffY-qhf4LpA"
);
