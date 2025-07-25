import { LayoutDashboard } from 'lucide-react';
import { List } from 'lucide-react';
import { Video } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

export const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Movies", path: "/movies" },
  { id: 3, name: "Theaters", path: "/theaters" },
  { id: 4, name: "Releases", path: "/releases" },
  { id: 5, name: "Favorites", path: "/favorites" },

];

export const malayalamMovies = [
  {
    id: 1,
    image:
      "https://m.media-amazon.com/images/I/718aNBkD+bL._UF1000,1000_QL80_.jpg",
    title: "Drishyam",
    genre: "Thriller | Drama",
    year: 2013,
    duration: "2h 40m",
    rating: 8.3,
    description:
      "Georgekutty, an uneducated cable TV operator, lives a happy life with his family. When a crime threatens to ruin their peaceful life, he uses his wit to protect them. The film explores how far one can go for family. A gripping thriller with unexpected twists.",
    cast: [
      {
        character: "Georgekutty",
        actor: "Mohanlal",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT-KLHXqelnyl2Y9rVsyAFEfi5smj_aFXjP4MnZs_BG6eCbf_lZPtim5UubI0eOaFtggQ8P3uWYocgkUBEDKRZ5mHPbdXRzx-6KYhhpJ0w"
      },
      {
        character: "Rani",
        actor: "Meena",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTQensjeVlGZ-sAwcGDcqY_SHcrqrmMFvJoX6nHlL3HDng6OgmPqIRFKoe_8wLBPDbIpxFdCOamRgovgcLoZIBy4g"
      },
      {
        character: "Geetha Prabhakar",
        actor: "Asha Sarath",
        image: "https://static.toiimg.com/thumb/61462721.cms?width=170&height=240"
      },
      {
        character: "Varun Prabhakar",
        actor: "Roshan Basheer",
        image: "https://static.toiimg.com/thumb/msid-122625486,imgsize-26154,width-400,resizemode-4/122625486.jpg"
      },
      {
        character: "Police Inspector Sahadevan",
        actor: "Kalabhavan Shajohn",
        image: "https://static.toiimg.com/thumb/61430849.cms?width=170&height=240"
      }
    ]
  },
  {
    id: 2,
    image:
      "https://onlookersmedia.in/wp-content/uploads/2019/02/Kumbalangi-Nights-New-Poster-Stills.jpg",
    title: "Kumbalangi Nights",
    genre: "Drama",
    year: 2019,
    duration: "2h 15m",
    rating: 8.6,
    description:
      "Four brothers living in a dysfunctional home in Kumbalangi village struggle with their differences. As they confront life’s challenges, they learn the true meaning of family. The film beautifully captures love, redemption and human bonds. A modern classic of Malayalam cinema.",
    cast: [
      {
        character: "Saji",
        actor: "Soubin Shahir",
        image: "https://m.media-amazon.com/images/M/MV5BZGIyMmY1MmUtZWJlOS00ZGM1LWI1ZGMtZjlkNWU4NTA1NjE5XkEyXkFqcGc@._V1_.jpg"
      },
      {
        character: "Bobby",
        actor: "Shane Nigam",
        image: "https://static.toiimg.com/thumb/msid-70433785,width-400,resizemode-4/70433785.jpg"
      },
      {
        character: "Frankie",
        actor: "Mathew Thomas",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQaNqtFWp8UH-UnPLHp9T2_lXZ0KZrCmdKXD5SsBS9gHk5IPrPLMbjxiZ8EC_gdUIbGuPZyMblitJFPEcKRZmIY3A"
      },
      {
        character: "Shammi",
        actor: "Fahadh Faasil",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQEqoqMHJLFcgQGsw0Ahbnrn5tE9y1Lz8Q6TT2SjXQQuR683h85vhPH6H_gxZrcbpd1efZsv89B88Txn9bxj8v3yg"
      },
      {
        character: "Nyla",
        actor: "Anna Ben",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBJoC4sswBT5R98j_7n6JmAqVzv-bKicZZgHmT5c9q48eCNTbXr_i-JMH5beFiyhCGyONYAdcJYOSjqdLEG42tMeT-_6NZkfMYfmVUAryr0w"
      }
    ]
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/JallikkattuFirstLook.jpg/250px-JallikkattuFirstLook.jpg",
    title: "Jallikattu",
    genre: "Action | Thriller",
    year: 2019,
    duration: "1h 35m",
    rating: 7.5,
    description:
      "In a remote village, a buffalo escapes a slaughterhouse and runs amok. Chaos erupts as villagers hunt it down, exposing their primal instincts. The film explores the thin line between civilization and savagery. A raw, adrenaline-packed cinematic experience.",
    cast: [
      {
        character: "Antony",
        actor: "Antony Varghese",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRFbHdGZMmcfUNqMnotYhzxrowunTUmN-qNkuJDmWzzqNKzdHqqFQ-p7bmaCmOoJJEiSOSvh4MlH3_CYabgHa1OWCiOs-V8nDER5CI8Sl3"
      },
      {
        character: "Kuttachan",
        actor: "Sabumon Abdusamad",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRuGpcKPhoec1tujlS7MvuKhN3xA5Js2SXdfNyQaoBljRj1szWTDWwX1fC4JdedgrvQrXo0G1j89ucFF4KYF4ujUFvRVM9EEE-8ZaJiaB7qFA"
      },
      {
        character: "Varkey",
        actor: "Chemban Vinod Jose",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQlWeczdQq58IA67Nzr5ibgeWQ_SnS9IS9lvXfdc-8SBY8vjKjMU-KwLMZT-cQ2RpCTVBCDw3-3ZXi74EOdr-gJx_J2HpBh4Mun3MPl2KRF"
      },
      {
        character: "Mansoor",
        actor: "Jaffer Idukki",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTHR0DKhuVti9sc020T1tMfxsfdi6CfrhpAGNE5ZDSUdoKlEUViEEi-DT83DRqokrago9bo67lFM5-wnoc9-qdA4awBJvMjkIU2f9b9HhfxPA"
      },
      {
        character: "Kurian",
        actor: "Tinu Pappachan",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8yBC3XreZAKESa_BoJ-1xvwZ02AnqlRdaEwJPY0D7UFyX99B6bDfGk1tNJu_iusQf9fXmG5EJFRdZnZ7IiMXpulo0k0Hy55w5DX1Fw3o7Aw"
      }
    ]
  },
  {
    id: 4,
    image: "https://static.qobuz.com/images/covers/05/27/3610156912705_600.jpg",
    title: "Bangalore Days",
    genre: "Comedy | Drama",
    year: 2014,
    duration: "2h 52m",
    rating: 8.3,
    description:
      "Three cousins move to Bangalore to chase their dreams and rediscover themselves. Amid love, heartbreak, and adventure, they strengthen their bond. The film beautifully portrays youth, friendship, and relationships. A heartwarming entertainer for all ages.",
    cast: [
      {
        character: "Arjun aka Aju",
        actor: "Dulquer Salmaan",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcScxlvBgTKJK5P7M_34Q4CIqfwYQIpPpSPK7S_XkepsGqxGTql3OdoEv3XDw21hIAGsa3wcNUMfgiZLMLQa2DSBo8ZDpFczoqZh1AVmS95BBQ"
      },
      {
        character: "Divya Prakash",
        actor: "Nazriya Nazim",
        image: "https://www.behindwoods.com/tamil-actress/nazriya-nazim/nazriya-nazim-stills-photos-pictures-345.jpg"
      },
      {
        character: "Krishnan P.P. aka Kuttan",
        actor: "Nivin Pauly",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSQIf_-LlAIUDt3GJkY9tULHDoWvEboz--WZrTxfUaKQ2PgUkV7ltqoRJ-cNAJ416zd1YkQ3AZHZoPgTU3D2sXJR9RyYMZVtFKeY5PicC0x"
      },
      {
        character: "Das",
        actor: "Fahadh Faasil",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQtdKLruqlERxQOaI1YUAm3BwN0gQC0GrbL-1TpLKTaP8KxtZEqfn6W9yDjo5VnF-8abqq6lh2P5tnvXvCePcnKtkrLjYEIAamatkV4a94raA"
      },
      {
        character: "Sarah",
        actor: "Parvathy Thiruvothu",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS9nYK-vGZ7Bl03_vOjCEDKtwMh77rZaVA0uwzvO2GNyMcE-vYQdkEhMQoD3aCfk91IHIQinRDHZh8KkhCRJIRYvrFuUNxUdCbvqHqRQISKrw"
      }
    ]
  },
  {
    id: 5,
    image:
      "https://popcornreviewss.com/wp-content/uploads/2023/04/2018-2023-Thriller-Malayalam-Movie.jpg",
    title: "2018",
    genre: "Drama | Thriller",
    year: 2023,
    duration: "2h 29m",
    rating: 8.7,
    description:
      "Set during the catastrophic Kerala floods of 2018, the film tells stories of survival and heroism. Ordinary people rise to face unimaginable odds. It highlights resilience, humanity, and community spirit. An inspiring tribute to Kerala’s real-life heroes.",
    cast: [
      {
        character: "Anup",
        actor: "Tovino Thomas",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoOgTaT08Clpp_TuzTGJfIdlBcIex80KHYKGUqZ6vv3WUXDOOVg1bgDE5RtlXO2GXtIWHlee_W12tzolQ2VXU2-S5xoSb1rP5HmeDg7ZX6"
      },
      {
        character: "Nixon",
        actor: "Asif Ali",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRoFzCylzmSbT4fZgexl4ciO81T-J4Z6NvtpT6RdV_d69rLpDNo1SIlTdmd7-xQBtumte-LhF2h3xlDQz6FAxfzlnz50XQupzDYtME4XRq-Dw"
      },
      {
        character: "Sathyan",
        actor: "Lal",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSgGvd3VuLKkg1KPWYnLUwknutITp6kqnums-DfO_4P4LkN9EyrFtFyFaKo95HTb2yDC78YiPy37YaTB4nwsRToH0zPX_2YrfYRkN_-U0Khsg"
      },
      {
        character: "Rameshan",
        actor: "Aju Varghese",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRGSGBN3SSaYX_7JbXIpkxazWDe3MGaP521YpfIRhC6BTAzZrOd2QtBX793Gw4SIJmGopewOl5VN8OgE23ivM_ewJQkvXP9xY4hoRNkR8H0Q"
      },
      {
        character: "Chandini",
        actor: "Aparna Balamurali",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQuhoJWu-EZQTt5SFh352N5BNimmJDQJjoI2RE-nTph61FW7ZDDIaKu-C3mevE_FaY-Lpn9ZEBFsBx35GW4I9xMsfrGTXWPddqjiFfHEJZA4g"
      }
    ]
  }
];



export const dummyTrailers = [
    {
        image: "https://img.youtube.com/vi/_HacZSM24mA/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/_HacZSM24mA?si=4_fB5x9dInhIqYLD'
    },
    {
        image: "https://img.youtube.com/vi/iqc9C7DtDOE/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/iqc9C7DtDOE?si=AoCwXpZqc1GwdLU_"
    },
    {
        image: "https://img.youtube.com/vi/41GswFhjRWk/maxresdefault.jpg",
        videoUrl: 'https://youtu.be/41GswFhjRWk?si=5VnFUtcmMzJDt6Fi'
    },
    {
        image: "https://img.youtube.com/vi/r4z4SAzQCm8/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/r4z4SAzQCm8?si=Lg7Vpxaa0mqjJshR" 
    },
]

export const adminNavlinks = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "List Bookings",
    path: "/admin/list-bookings",
    icon: List,
  },
  {
    name: "List Show",
    path: "/admin/list-shows",
    icon: Video,
  },
  {
    name: "Add Shows",
    path: "/admin/add-shows",
    icon: CirclePlus,
  },
];
