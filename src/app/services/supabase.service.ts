import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Item } from './item';
import { User } from './user';
import { Linha_Lista } from './linha_lista';
import { Lista } from './lista';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://zxgkusafpcwiwmfvfqra.supabase.co'; // URL copiado no passo acima 
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Z2t1c2FmcGN3aXdtZnZmcXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzNTUwNDgsImV4cCI6MTk5OTkzMTA0OH0.6nPjIAh4AI96IUIhavK3x60A2f3aKo1rlirrxpHWexY'; // anon public copiada no passo acima;
  private supabaseClient: SupabaseClient;
  
  constructor() { 
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }
}
