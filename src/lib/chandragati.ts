export function calculateChandragati(ghati: number, pal: number) {
    const bhabhogPal = ghati * 60 + pal;
    if (bhabhogPal <= 0) throw new Error("भभोग पलात्मक मान शून्य नहीं हो सकता");
    const q1 = Math.floor(2880000 / bhabhogPal);
    const r1 = 2880000 % bhabhogPal;
    const palNumerator = r1 * 60;
    const q2 = Math.floor(palNumerator / bhabhogPal);
    const r2 = palNumerator % bhabhogPal;
    const vipalNumerator = r2 * 60;
    const q3 = Math.floor(vipalNumerator / bhabhogPal);
    return { bhabhogPal, ghati: q1, pal: q2, vipal: q3, q1, r1, q2, r2, q3 };
}
