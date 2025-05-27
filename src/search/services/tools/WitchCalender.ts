export function dateToWitchString(date: Date): string {
  const moonPhases = [
    { name: "New Moon", flavor: "when the moon hides her face" },
    { name: "Waxing Crescent", flavor: "as the crescent sharpens her silver smile" },
    { name: "First Quarter", flavor: "under the moon half-lit, half-shadowed" },
    { name: "Waxing Gibbous", flavor: "as the light swells toward fullness" },
    { name: "Full Moon", flavor: "beneath the watchful eye of the Full Moon" },
    { name: "Waning Gibbous", flavor: "as the moon sheds her silver cloak" },
    { name: "Last Quarter", flavor: "when the half-light begins to fade" },
    { name: "Waning Crescent", flavor: "as the final crescent vanishes into mist" },
  ];

  const synodicMonth = 29.530588853;
  const knownNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
  const current = date.getTime();
  const daysSince = (current - knownNewMoon) / (1000 * 60 * 60 * 24);
  const phaseIndex = Math.floor((daysSince % synodicMonth) / (synodicMonth / 8)) % 8;

  const phase = moonPhases[phaseIndex];

  return `Your parcel shall arrive ${phase.flavor}. 🌙`;
}
