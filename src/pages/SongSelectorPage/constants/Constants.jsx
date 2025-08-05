let songs = [
    {
        id: 1,
        title: "Weightless Part 1",
        artist: "Marconi Union",
        album: "Weightless (Ambient Transmissions Vol. 2)",
        duration: "8:00",
        playlist: ['focus', 'chill'],
        cover: "https://i.scdn.co/image/ab67706c0000da840e7b16a164edddd1490380a4",
        audioUrl: '/assets/audio_previews/Weightless%20Part%201.mp3'
    },
    {
        id: 2,
        title: "Laying Low",
        artist: "Galimatias",
        album: "Shy Dancer",
        duration: "3:03",
        playlist: ['chill', 'electronic'],
        cover: "https://i.scdn.co/image/ab67616d00001e0231edc53c70f8bb6eaf669989",
        audioUrl: "/assets/audio_previews/Laying%20Low.mp3"
    },
    {
        id: 3,
        title: "Sunset Lover",
        artist: "Petit Biscuit",
        album: "Petit Biscuit / Presence",
        duration: "3:57",
        playlist: ['chill', 'electronic'],
        cover: "https://i.scdn.co/image/ab67616d000011eb014080d39d56c94c0b285362",
        audioUrl: "/assets/audio_previews/Sunset%20Lover.mp3"
    },
    {
        id: 4,
        title: "Divinity",
        artist: "Porter Robinson ft. Amy Millan",
        album: "Worlds",
        duration: "6:08",
        playlist: ['electronic', 'focus'],
        cover: "https://i.scdn.co/image/ab67616d000011eb1f675e7b8bae408653346dd9",
        audioUrl: "/assets/audio_previews/Divinity.mp3"
    },
    {
        id: 5,
        title: "Everything in Its Right Place",
        artist: "Radiohead",
        album: "Kid A",
        duration: "4:11",
        playlist: ['focus'],
        cover: "https://i.scdn.co/image/ab67616d00001e026c7112082b63beefffe40151",
        audioUrl: "/assets/audio_previews/Everything%20in%20Its%20Right%20Place.mp3"
    },
    {
        id: 6,
        title: "Intro",
        artist: "The xx",
        album: "xx",
        duration: "2:07",
        playlist: ['chill', 'focus'],
        cover: "https://i.scdn.co/image/ab676d63000076a0e82b5543f4c004b02c7dc8d2",
        audioUrl: "/assets/audio_previews/Intro.mp3"
    },
    {
        id: 7,
        title: "Everything Goes On",
        artist: "Porter Robinson",
        album: "Single",
        duration: "3:22",
        playlist: ['focus', 'chill'],
        cover: "https://i.scdn.co/image/ab67616d000011eb2b1a62237771427afb899387",
        audioUrl: "/assets/audio_previews/Everything%20Goes%20On.mp3"
    },
    {
        id: 8,
        title: "Atlas",
        artist: "Lane 8",
        album: "Little by Little",
        duration: "5:50",
        playlist: ['electronic', 'focus'],
        cover: "https://i.scdn.co/image/ab67616d00001e023632681259e482efdffdc1b1",
        audioUrl: "/assets/audio_previews/Atlas.mp3"
    },
    {
        id: 9,
        title: "Light of the Seven",
        artist: "Ramin Djawadi",
        album: "Game of Thrones: Season 6",
        duration: "9:49",
        playlist: ['focus'],
        cover: "https://i.scdn.co/image/ab67616d000011ebe4f028aed6760c0c7f1eb0ca",
        audioUrl: "/assets/audio_previews/Light%20of%20the%20Seven.mp3"
    },
    {
        id: 10,
        title: "Pink & Blue",
        artist: "Tycho",
        album: "Weather",
        duration: "4:19",
        playlist: ['focus', 'chill'],
        cover: "https://i.scdn.co/image/ab67616d00004851811bbf83c64ff959cb9feb16",
        audioUrl: "/assets/audio_previews/Pink%20&%20Blue.mp3"
    },
    {
        id: 11,
        title: "A Moment Apart",
        artist: "ODESZA",
        album: "A Moment Apart (Deluxe Edition)",
        duration: "3:54",
        playlist: ['chill'],
        cover: "https://i.scdn.co/image/ab67616d00001e021b029b71b43652cdc6e9fc0f",
        audioUrl: "/assets/audio_previews/A%20Moment%20Apart.mp3"
    },
    {
        id: 12,
        title: "Falaise",
        artist: "Floating Points",
        album: "Crush",
        duration: "3:54",
        playlist: ['electronic', 'focus'],
        cover: "https://i.scdn.co/image/ab67616d0000b273d03dff7f5eeee485e5a45f62",
        audioUrl: "/assets/audio_previews/Falaise.mp3"
    },
    {
        id: 13,
        title: "Your Idol",
        artist: "Saja Boys",
        album: "KPop Demon Hunters",
        duration: "3:11",
        playlist: ['electronic'],
        cover: "https://i.scdn.co/image/ab67706c0000da8438a4d9bc6d608322754f760e",
        audioUrl: "/assets/audio_previews/Your%20Idol.mp3"
    }
];

const Constants = {

    // Songs
    songs: songs,

    getPlaylist: (t) => songs.filter((s) => (s.playlist.includes(t))),
    getFavorites: (favorites) => songs.filter((s) => favorites.includes(s.id)),

    // Playlist Information
    playlists: [
        { id: 'all', name: 'All Tracks', icon: 'Music' },
        { id: 'focus', name: 'Focus Flow', icon: 'Brain' },
        { id: 'chill', name: 'Chill Vibes', icon: 'Coffee' },
        { id: 'electronic', name: 'Electronic', icon: 'Zap' },
        { id: 'favorites', name: 'Favorites', icon: 'Heart' }
    ]
}

export default Constants;