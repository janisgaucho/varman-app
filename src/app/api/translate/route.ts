import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json();
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Clé API Google manquante." }, { status: 500 });
    }

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: "Texte ou langue cible manquants." }, { status: 400 });
    }

    // Appel REST standard à l'API Google Translate v2
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ 
      translatedText: data.data.translations[0].translatedText 
    });

  } catch (error) {
    console.error("Erreur de traduction:", error);
    return NextResponse.json({ error: "Erreur lors de la traduction." }, { status: 500 });
  }
}