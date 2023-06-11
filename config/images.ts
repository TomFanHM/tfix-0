type ImageItem = {
  src: string;
  blurHash: string;
};

type Images = {
  [key: string]: ImageItem;
};

const service: Images = {
  butler: {
    src: "/images/service/butler.png",
    blurHash: "L6D8|800%L~W=s9{$%n#XQ0g^j4.",
  },
  maid_00: {
    src: "/images/service/maid_00.png",
    blurHash: "L7Eex?%10LOE4nx]_2?b0MIo^Q~C",
  },
  maid_01: {
    src: "/images/service/maid_01.png",
    blurHash: "LNG[7w4o%g%200~WRPRjTeRPxFRj",
  },
  maid_02: {
    src: "/images/service/maid_02.png",
    blurHash: "LJFF5B~W%M-pxt?bt7of5R%2?HNG",
  },
};

const home: Images = {
  anime_mobile: {
    src: "/images/home/anime_mobile.png",
    blurHash: "LJQvHg^~--8~~lD,M}--t8WTRjxu",
  },
  anime: {
    src: "/images/home/anime.png",
    blurHash: "LNQI|x~m%d04tKV|s:WS%LM|Rkxt",
  },
  blog: {
    src: "/images/home/blog.png",
    blurHash: "LAS$48^$?E5F~TE4M}-i%1WAIuxY",
  },
  chatbot_mobile: {
    src: "/images/home/chatbot_mobile.png",
    blurHash: "L3FF,lEx5z=k6J$l,xJ{EJxHxcNX",
  },
  chatbot: {
    src: "/images/home/chatbot.png",
    blurHash: "L5FiWa1ENY][%3RjjXo#5y,|o5OM",
  },
  create: {
    src: "/images/home/create.png",
    blurHash: "LEShDY?G-oNH~BIoM|t6xtR*R*of",
  },
  movie: {
    src: "/images/home/movie.png",
    blurHash: "LGHEKycWpuiKufZ%VGk;RjoffkWB",
  },
  news_mobile: {
    src: "/images/home/news_mobile.png",
    blurHash: "LEEXei%%V@V@%%Mcogogozaeayj[",
  },
  news: {
    src: "/images/home/news.png",
    blurHash: "LOD_Hm*0V?V?V@ozWAogyEMwozay",
  },
  one_side_front_other: {
    src: "/images/home/one_side_front_other.png",
    blurHash: "L8HwV_00AG~C00yXiw%M03VY-:of",
  },
  one_side_front: {
    src: "/images/home/one_side_front.png",
    blurHash: "LACYagNG5RNa0fs:Ios:00NH}[jZ",
  },
  one_side_male: {
    src: "/images/home/one_side_male.png",
    blurHash: "LOIzn=~qFzg300DiDiE1O[-;xaM|",
  },
  one_side: {
    src: "/images/home/one_side.png",
    blurHash: "LFExU|00~V9FE2-pi_I;0L^kMx%M",
  },
  search: {
    src: "/images/home/search.png",
    blurHash: "L9OwEX=y$*I:}tEfNa$*R*s.j[WV",
  },
};

const other: Images = {
  cute_chicken: {
    src: "/images/other/cute_chicken.png",
    blurHash: "",
  },
  empty: {
    src: "/images/other/empty.png",
    blurHash: "",
  },
  error: {
    src: "/images/other/error.png",
    blurHash: "",
  },
  fallback: {
    src: "/images/other/fallback.png",
    blurHash: "",
  },
  lock: {
    src: "/images/other/lock.png",
    blurHash: "",
  },
  maintenance: {
    src: "/images/other/maintenance.png",
    blurHash: "",
  },
  not_found: {
    src: "/images/other/not_found.png",
    blurHash: "",
  },
};

export const imagesConfig = {
  home,
  service,
  other,
};
