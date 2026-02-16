import { supabase } from './supabaseClient'

export const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${location.origin}/auth/callback`,
        },
    })
}



export async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
}
