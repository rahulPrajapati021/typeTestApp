const paragraphs = [
    {
        id: 1,
        data: "The sun dipped below the horizon, casting a golden glow across the tranquil lake. The water shimmered with the last light of day, and the evening breeze gently rustled the leaves of nearby trees. As the stars began to emerge in the darkening sky, the world seemed to settle into a peaceful rhythm. Crickets chirped in the distance, and the distant sound of laughter echoed from a nearby campfire. Nature's symphony played on, and for a moment, all worries seemed to fade away."
    },
    {
        id: 2,
        data: "In the heart of the bustling city, life moved at a frenetic pace. People hurried along crowded streets, their footsteps echoing against towering skyscrapers. Car horns blared, and sirens wailed in the distance. Amidst the chaos, street vendors called out their wares, and the aroma of diverse cuisines filled the air. Neon lights illuminated the night, creating a vibrant tapestry of colors. Amidst the urban hustle, dreams and ambitions intertwined, creating a unique mosaic of life."
    },
    {
        id: 3,
        data: "High in the mountains, a solitary cabin stood, surrounded by an untouched wilderness. The air was crisp and refreshing, scented with the fragrance of pine trees. From the cabin's porch, a breathtaking vista of snow-capped peaks and valleys spread out before the eyes. A solitary eagle soared gracefully above, enjoying the freedom of the vast sky. In this secluded haven, time seemed to slow down, allowing for reflection and tranquility."
    },
    {
        id: 4,
        data: "The ancient ruins held stories of a long-forgotten civilization. Weathered stone walls stood as silent witnesses to the passage of time. Nature had begun to reclaim the once-mighty structures, with vines creeping up their sides. As one wandered through the remnants of the past, the imagination could paint vivid pictures of life as it once was. Each step brought the explorer closer to the mysteries of history, and the thrill of discovery was palpable."
    },
]

const randomPara = () => {
    //returns random pagaraph
    let n = Math.floor(Math.random() * paragraphs.length + 0) 
    return paragraphs[n].data;
}