import type { Question } from '../types/index.ts'

const text = (en: string, zh: string) => ({ en, zh })

export const questions: readonly Question[] = [
  {
    id: 'japan',
    category: 'country',
    answers: { en: ['Japan', 'Nippon', 'Nihon'], zh: ['日本', '日本国'] },
    clues: [
      text(
        'Kabuki, a highly stylized form of theater with elaborate makeup, took shape here in the 17th century.',
        '歌舞伎是这里在十七世纪形成的古典戏剧，以夸张的妆容和程式化表演著称。',
      ),
      text(
        'The national parliament is called the Diet, and the emperor is the ceremonial head of state.',
        '国家议会称为国会，天皇是名义上的国家元首。',
      ),
      text('Mount Fuji is the highest peak, and the capital is Tokyo.', '最高峰是富士山，首都是东京。'),
      text(
        'This East Asian island country is widely known for sushi, anime, and bullet trains.',
        '这个东亚岛国以寿司、动漫和新干线闻名。',
      ),
    ],
    explanation: text(
      'Japan is an East Asian island country. Honshu, Hokkaido, Kyushu, and Shikoku are its four largest islands, and Tokyo is the capital.',
      '日本是东亚岛国，本州、北海道、九州和四国是四座主要岛屿，首都为东京。',
    ),
  },
  {
    id: 'france',
    category: 'country',
    answers: { en: ['France', 'French Republic'], zh: ['法国', '法兰西', '法國'] },
    clues: [
      text(
        'The Loire Valley here holds hundreds of Renaissance châteaux, including Chambord.',
        '卢瓦尔河谷汇集了香波堡等数百座文艺复兴时期的城堡。',
      ),
      text('The national motto is “Liberté, égalité, fraternité.”', '国家格言是“自由、平等、博爱”。'),
      text('The Eiffel Tower stands in the capital, Paris.', '埃菲尔铁塔矗立在首都巴黎。'),
      text(
        'This Western European country is famous for wine, cheese, and haute couture.',
        '这个西欧国家以葡萄酒、奶酪和高级时装闻名。',
      ),
    ],
    explanation: text(
      'France is a Western European republic. Paris is the capital, and the country has long shaped food, fashion, and republican ideas.',
      '法国是西欧共和国，首都巴黎，在饮食、时装和共和传统上都影响深远。',
    ),
  },
  {
    id: 'egypt',
    category: 'country',
    answers: { en: ['Egypt'], zh: ['埃及'] },
    clues: [
      text(
        'In the 1960s the temples at Abu Simbel were moved, block by block, to escape the rising water of Lake Nasser.',
        '二十世纪六十年代，阿布辛贝神庙被逐块迁走，以避开纳赛尔湖上涨的水位。',
      ),
      text(
        'The Nile runs the length of the country and opens into a broad delta in the north.',
        '尼罗河纵贯全境，并在北部展开为广阔的三角洲。',
      ),
      text(
        'The Great Pyramid and the Great Sphinx stand at Giza, near Cairo.',
        '大金字塔和狮身人面像位于开罗附近的吉萨。',
      ),
      text(
        'This North African country is famous for pharaohs, hieroglyphs, and pyramids.',
        '这个北非国家以法老、象形文字和金字塔闻名。',
      ),
    ],
    explanation: text(
      'Egypt spans northeast Africa and the Sinai Peninsula. The Nile supported one of the world’s oldest civilizations.',
      '埃及地跨非洲东北部与西奈半岛，尼罗河孕育了世界上最古老的文明之一。',
    ),
  },
  {
    id: 'brazil',
    category: 'country',
    answers: { en: ['Brazil', 'Brasil'], zh: ['巴西'] },
    clues: [
      text(
        'Iguazu Falls, one of the largest waterfall systems on Earth, lies on the border with Argentina.',
        '伊瓜苏瀑布位于与阿根廷的边境，是世界上最大的瀑布群之一。',
      ),
      text(
        'Portuguese is the official language, unlike in most of the neighboring countries.',
        '官方语言是葡萄牙语，这在邻国中相当少见。',
      ),
      text(
        'The Amazon rainforest covers much of the north, and the planned capital sits inland on a high plateau.',
        '亚马孙雨林覆盖北部大片土地，规划建成的首都坐落在内陆高原上。',
      ),
      text(
        'This is the largest country in South America, known for Carnival in Rio de Janeiro.',
        '这是南美洲面积最大的国家，里约热内卢的狂欢节非常著名。',
      ),
    ],
    explanation: text(
      'Brazil covers nearly half of South America. It holds most of the Amazon basin and a long Atlantic coast.',
      '巴西约占南美洲一半的面积，拥有亚马孙流域的大部分和漫长的大西洋海岸。',
    ),
  },
  {
    id: 'canada',
    category: 'country',
    answers: { en: ['Canada'], zh: ['加拿大'] },
    clues: [
      text(
        'Nunavut became the newest territory in 1999, with Iqaluit as its capital.',
        '努纳武特是1999年设立的新领地，首府是伊魁特。',
      ),
      text(
        'English and French are both official languages at the federal level.',
        '联邦层面的官方语言同时包括英语和法语。',
      ),
      text('A maple leaf appears on the flag, and the capital is Ottawa.', '国旗上有枫叶，首都是渥太华。'),
      text(
        'This is the second-largest country in the world by area, stretching across northern North America.',
        '这是世界上面积第二大的国家，横跨北美洲北部。',
      ),
    ],
    explanation: text(
      'Canada reaches from the United States border to the Arctic Ocean. Ottawa is the capital, and the country is officially bilingual.',
      '加拿大从美国边境一直延伸到北冰洋。首都是渥太华，联邦官方语言为英语和法语。',
    ),
  },
  {
    id: 'kenya',
    category: 'country',
    answers: { en: ['Kenya'], zh: ['肯尼亚', '肯尼亞', '肯亞'] },
    clues: [
      text(
        'The Maasai Mara reserve is famous for wildebeest crossing the Mara River each year.',
        '马赛马拉保护区以角马每年渡过马拉河的大迁徙闻名。',
      ),
      text(
        'Nairobi, the capital, sits high on a plateau and is one of Africa’s higher capitals.',
        '首都内罗毕坐落在高原上，是非洲海拔较高的首都之一。',
      ),
      text(
        'The mountain that shares the country’s name is the second-highest peak in Africa.',
        '与国名同名的山峰是非洲第二高峰。',
      ),
      text(
        'This East African country is known for wildlife safaris and the Great Rift Valley.',
        '这个东非国家以野生动物游猎和东非大裂谷著称。',
      ),
    ],
    explanation: text(
      'Kenya lies on the equator in East Africa. Highlands, the Rift Valley, and large wildlife reserves shape the country.',
      '肯尼亚位于东非赤道线上，高原、裂谷和大型野生动物保护区构成了它的地理特征。',
    ),
  },
  {
    id: 'norway',
    category: 'country',
    answers: { en: ['Norway'], zh: ['挪威'] },
    clues: [
      text(
        'Geirangerfjord, a UNESCO World Heritage site, is one of the best-known fjords here.',
        '盖朗厄尔峡湾是这里最著名的峡湾之一，也被列入世界遗产。',
      ),
      text('Parliament is called the Storting, and the capital is Oslo.', '议会称为斯托廷，首都是奥斯陆。'),
      text(
        'Bergen, a historic port on the west coast, faces the North Sea.',
        '西海岸的历史港口卑尔根面朝北海。',
      ),
      text(
        'This Scandinavian country is known for its fjords and Viking seafaring past.',
        '这个斯堪的纳维亚国家以峡湾和维京航海传统闻名。',
      ),
    ],
    explanation: text(
      'Norway occupies the western side of the Scandinavian Peninsula. Fjords cut deeply into its Atlantic coast, and Oslo is the capital.',
      '挪威位于斯堪的纳维亚半岛西侧，峡湾深深切入大西洋海岸，首都是奥斯陆。',
    ),
  },
  {
    id: 'australia',
    category: 'country',
    answers: { en: ['Australia'], zh: ['澳大利亚', '澳洲', '澳大利亞'] },
    clues: [
      text(
        'Uluru, a massive sandstone monolith also called Ayers Rock, rises from the desert in the Northern Territory.',
        '乌鲁鲁是北领地沙漠中一块巨大的砂岩单体，也常被称作艾尔斯岩。',
      ),
      text('The capital is Canberra, while the largest city is Sydney.', '首都是堪培拉，最大城市则是悉尼。'),
      text('The Great Barrier Reef runs along the northeast coast.', '大堡礁沿东北海岸绵延。'),
      text(
        'This country is also a continent, and kangaroos and the Sydney Opera House are familiar symbols.',
        '这个国家本身也是一块大陆，袋鼠和悉尼歌剧院都是它的标志。',
      ),
    ],
    explanation: text(
      'Australia is both a country and a continent in Oceania. Most large cities sit on the coast, and Canberra is the capital.',
      '澳大利亚既是国家也是大洋洲的大陆，主要城市集中在海岸，首都是堪培拉。',
    ),
  },
  {
    id: 'india',
    category: 'country',
    answers: { en: ['India'], zh: ['印度'] },
    clues: [
      text(
        'Emperor Shah Jahan commissioned the Taj Mahal at Agra in the 17th century as a tomb.',
        '十七世纪，沙贾汗皇帝在阿格拉建造泰姬陵，作为一座陵墓。',
      ),
      text('The Ganges is the most revered river, and the capital is New Delhi.', '恒河是最受尊崇的河流，首都是新德里。'),
      text('It is the most populous country in the world.', '它是世界上人口最多的国家。'),
      text(
        'This South Asian country is known for Bollywood, spices, and the Himalayas along its northern edge.',
        '这个南亚国家以宝莱坞、香料和北部的喜马拉雅山脉闻名。',
      ),
    ],
    explanation: text(
      'India occupies most of the Indian subcontinent. It is the world’s most populous country, with New Delhi as its capital.',
      '印度占据印度次大陆的大部分，是世界上人口最多的国家，首都为新德里。',
    ),
  },
  {
    id: 'mexico',
    category: 'country',
    answers: { en: ['Mexico', 'México'], zh: ['墨西哥'] },
    clues: [
      text(
        'The Maya city of Chichén Itzá, with the step pyramid El Castillo, stands on the Yucatán Peninsula.',
        '玛雅城邦奇琴伊察位于尤卡坦半岛，其中有阶梯金字塔“城堡”。',
      ),
      text(
        'The capital is one of the world’s largest cities and shares the country’s name.',
        '首都是世界上最大的城市之一，并且与国名相同。',
      ),
      text(
        'The capital sits in a high valley, and the old lake bed still shapes the modern city.',
        '首都坐落在高海拔谷地，古老的湖床至今仍影响着城市的形态。',
      ),
      text(
        'This North American country is known for mariachi, tacos, and the Day of the Dead.',
        '这个北美洲国家以马里亚奇音乐、塔可和亡灵节闻名。',
      ),
    ],
    explanation: text(
      'Mexico links North and Central America. Indigenous civilizations and later Spanish colonial history meet across its territory.',
      '墨西哥连接北美洲与中美洲，古老文明和后来的西班牙殖民历史在这里交汇。',
    ),
  },
  {
    id: 'morocco',
    category: 'country',
    answers: { en: ['Morocco'], zh: ['摩洛哥'] },
    clues: [
      text(
        'The Chouara Tannery in Fez is famous for its stone dye pits, still worked largely by hand.',
        '非斯的舒瓦拉染坊以一排排石砌染池闻名，至今仍大多靠手工操作。',
      ),
      text(
        'The Atlas Mountains cross the country, and Casablanca is the largest city.',
        '阿特拉斯山脉横贯境内，最大城市是卡萨布兰卡。',
      ),
      text('Marrakesh is known for the square Jemaa el-Fnaa.', '马拉喀什以杰马埃弗纳广场著称。'),
      text('This North African kingdom has its capital at Rabat.', '这个北非王国的首都是拉巴特。'),
    ],
    explanation: text(
      'Morocco sits at the northwest corner of Africa, across the Strait of Gibraltar from Spain. Rabat is the capital.',
      '摩洛哥位于非洲西北角，隔直布罗陀海峡与西班牙相望，首都是拉巴特。',
    ),
  },
  {
    id: 'greece',
    category: 'country',
    answers: { en: ['Greece', 'Hellas'], zh: ['希腊', '希臘'] },
    clues: [
      text(
        'The Parthenon, a temple to Athena, crowns the Acropolis above the capital.',
        '帕特农神庙供奉雅典娜，矗立在首都上方的卫城之巅。',
      ),
      text(
        'The territory includes a mainland and thousands of islands, among them Crete and Rhodes.',
        '国土包括大陆和数千座岛屿，克里特岛和罗德岛都在其中。',
      ),
      text('Athens is the capital, beside the Aegean Sea.', '首都是雅典，东侧濒临爱琴海。'),
      text(
        'Ancient democracy, the Olympic Games, and classical mythology are closely tied to this Mediterranean country.',
        '古代民主、奥林匹克运动会和古典神话都与这个地中海国家紧密相连。',
      ),
    ],
    explanation: text(
      'Greece reaches the southern end of the Balkans and includes thousands of islands in the Aegean and Ionian seas. Athens is the capital.',
      '希腊位于巴尔干半岛南端，爱琴海和爱奥尼亚海中有数千座岛屿，首都是雅典。',
    ),
  },
  {
    id: 'paris',
    category: 'city',
    answers: { en: ['Paris'], zh: ['巴黎'] },
    clues: [
      text(
        'The Musée d’Orsay, a converted railway station, holds a renowned collection of Impressionist paintings here.',
        '奥赛博物馆由旧火车站改造而成，以印象派馆藏闻名。',
      ),
      text(
        'The Seine divides the city, and Notre-Dame stands on the Île de la Cité.',
        '塞纳河穿城而过，圣母院坐落在城中的西岱岛上。',
      ),
      text('The Louvre and the Latin Quarter are both here.', '卢浮宫和拉丁区都在这座城市里。'),
      text('This is the capital of France.', '这座城市是法国的首都。'),
    ],
    explanation: text(
      'Paris is the capital of France. The Seine, its museums, and its boulevards give the city much of its shape.',
      '巴黎是法国首都。塞纳河、博物馆和林荫大道构成了这座城市的基本格局。',
    ),
  },
  {
    id: 'kyoto',
    category: 'city',
    answers: { en: ['Kyoto'], zh: ['京都'] },
    clues: [
      text(
        'Fushimi Inari Taisha is known for thousands of vermilion torii gates climbing the mountainside.',
        '伏见稻荷大社以成千上万座朱红色鸟居闻名，鸟居沿山坡层层叠上。',
      ),
      text(
        'Gion is a historic district associated with geisha, and the city was Japan’s imperial capital for centuries.',
        '祇园是与艺伎相关的历史街区，这座城市也曾长期作为日本的皇都。',
      ),
      text('Kinkaku-ji, the Golden Pavilion, is one of its most photographed temples.', '金阁寺是这里最常被拍摄的寺院之一。'),
      text(
        'This Japanese city near Osaka is famous for temples, gardens, and traditional townhouses.',
        '这座靠近大阪的日本城市，以寺院、庭园和传统町家闻名。',
      ),
    ],
    explanation: text(
      'Kyoto, on Honshu, was the imperial seat from 794 to 1868. Temples, shrines, and old neighborhoods still define it.',
      '京部位于日本本州，794年至1868年曾是天皇驻地，寺院、神社和传统街区至今仍是城市的核心。',
    ),
  },
  {
    id: 'new-york',
    category: 'city',
    answers: { en: ['New York', 'New York City', 'NYC'], zh: ['纽约', '纽约市', '紐約'] },
    clues: [
      text('The Statue of Liberty stands on an island in this city’s harbor.', '自由女神像矗立在这座城市的港湾中。'),
      text(
        'Five boroughs make it up: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.',
        '它由曼哈顿、布鲁克林、皇后区、布朗克斯和斯塔滕岛五个区组成。',
      ),
      text(
        'Times Square, Central Park, and the Empire State Building are among its landmarks.',
        '时代广场、中央公园和帝国大厦都是这里的标志。',
      ),
      text('This is the most populous city in the United States.', '这是美国人口最多的城市。'),
    ],
    explanation: text(
      'New York City is the largest city in the United States. Its harbor and five boroughs shape the metropolitan area.',
      '纽约是美国人口最多的城市，港湾和五个行政区构成了都会区的格局。',
    ),
  },
  {
    id: 'venice',
    category: 'city',
    answers: { en: ['Venice', 'Venezia'], zh: ['威尼斯'] },
    clues: [
      text(
        'The historic center spreads across more than 100 small islands in a lagoon of the Adriatic Sea.',
        '历史城区建在亚得里亚海潟湖中的一百多座小岛上。',
      ),
      text('The Grand Canal is the main waterway, and gondolas are a traditional boat.', '大运河是主要水道，贡多拉是传统船只。'),
      text('St. Mark’s Basilica and the Rialto Bridge are famous sights.', '圣马可大教堂和里亚尔托桥都是著名景点。'),
      text('This Italian city is known around the world for its canals.', '这座意大利城市以运河闻名世界。'),
    ],
    explanation: text(
      'Venice is built across a lagoon in northeastern Italy. It was once a powerful maritime republic.',
      '威尼斯建在意大利东北部的潟湖之上，历史上曾是强盛的海上共和国。',
    ),
  },
  {
    id: 'reykjavik',
    category: 'city',
    answers: { en: ['Reykjavik', 'Reykjavík'], zh: ['雷克雅未克', '雷克雅維克'] },
    clues: [
      text(
        'Hallgrímskirkja, a concrete church inspired by basalt columns, towers over the skyline.',
        '哈尔格林姆教堂的混凝土塔楼模仿玄武岩石柱，耸立在城市天际线上。',
      ),
      text('It is the world’s northernmost capital of a sovereign state.', '它是主权国家中位置最北的首都。'),
      text('Most buildings in the city are heated with geothermal water.', '城区建筑大多用地热热水供暖。'),
      text('This is the capital of Iceland.', '这座城市是冰岛的首都。'),
    ],
    explanation: text(
      'Reykjavík is the capital of Iceland and the northernmost capital of a sovereign state. Geothermal heat warms much of the city.',
      '雷克雅未克是冰岛首都，也是主权国家中最北的首都，城市供暖大量依赖地热。',
    ),
  },
  {
    id: 'cape-town',
    category: 'city',
    answers: { en: ['Cape Town'], zh: ['开普敦', '開普敦'] },
    clues: [
      text('Table Mountain, with its flat summit, rises directly behind this coastal city.', '平顶的桌山紧贴着这座海滨城市升起。'),
      text(
        'It is the legislative capital of South Africa, one of the country’s three capitals.',
        '它是南非三个首都之一，承担立法首都的职能。',
      ),
      text(
        'Robben Island, where Nelson Mandela was imprisoned, lies in the bay nearby.',
        '纳尔逊·曼德拉曾被囚禁的罗本岛就在附近的海湾中。',
      ),
      text(
        'This South African city faces the Atlantic, with steep mountains at its back.',
        '这座南非城市面向大西洋，背后是陡峭的山体。',
      ),
    ],
    explanation: text(
      'Cape Town is South Africa’s legislative capital, set between Table Mountain and the Atlantic on the Cape Peninsula.',
      '开普敦是南非的立法首都，位于开普半岛，一侧是桌山，一侧是大西洋。',
    ),
  },
  {
    id: 'london',
    category: 'city',
    answers: { en: ['London'], zh: ['伦敦', '倫敦'] },
    clues: [
      text(
        'The Palace of Westminster and the clock tower commonly called Big Ben stand beside the Thames here.',
        '威斯敏斯特宫和常被称作大本钟的钟楼，都矗立在这里的泰晤士河畔。',
      ),
      text('It is the capital of the United Kingdom.', '这座城市是英国的首都。'),
      text(
        'A royal palace, a medieval riverside fortress, and a large observation wheel are major sights.',
        '一座王宫、一座河畔的中世纪堡垒，以及一座大型摩天轮，都是这里的主要景点。',
      ),
      text('This city on the River Thames is the largest in the United Kingdom.', '这座泰晤士河畔的城市是英国最大的城市。'),
    ],
    explanation: text(
      'London straddles the River Thames and is the capital and largest city of the United Kingdom.',
      '伦敦跨泰晤士河两岸，是英国的首都和最大城市。',
    ),
  },
  {
    id: 'eiffel-tower',
    category: 'landmark',
    answers: { en: ['Eiffel Tower', 'Tour Eiffel'], zh: ['埃菲尔铁塔', '艾菲尔铁塔', '巴黎铁塔', '艾菲爾鐵塔', '巴黎鐵塔'] },
    clues: [
      text(
        'It was built as the entrance piece for the 1889 Exposition Universelle and was nearly demolished afterward.',
        '它为1889年世界博览会而建，原本作为入口建筑，博览会结束后差点被拆除。',
      ),
      text(
        'The wrought-iron lattice was assembled from prefabricated pieces in a little over two years.',
        '锻铁格子由预制构件拼装而成，施工只用了两年多。',
      ),
      text('It rises from the Champ de Mars beside the Seine in Paris.', '它坐落在巴黎塞纳河畔的战神广场。'),
      text(
        'This tower, about 330 meters tall, is among the most recognized landmarks in the world.',
        '这座约330米高的铁塔，是世界上辨识度最高的地标之一。',
      ),
    ],
    explanation: text(
      'The Eiffel Tower was completed for the 1889 world’s fair in Paris. The wrought-iron lattice was engineered by Gustave Eiffel’s company.',
      '埃菲尔铁塔为1889年巴黎世界博览会而建，锻铁格子结构由居斯塔夫·埃菲尔的公司完成。',
    ),
  },
  {
    id: 'machu-picchu',
    category: 'landmark',
    answers: { en: ['Machu Picchu'], zh: ['马丘比丘', '馬丘比丘'] },
    clues: [
      text(
        'Hiram Bingham brought this Inca citadel to wide international attention in 1911.',
        '1911年，海勒姆·宾厄姆让这座印加城寨受到国际广泛关注。',
      ),
      text('It sits on a high Andean ridge above the Urubamba River.', '它坐落在安第斯山脉的山脊上，俯瞰乌鲁班巴河。'),
      text(
        'Travelers usually set out from Cusco and continue through the town of Aguas Calientes.',
        '游客通常从库斯科出发，再经热水镇抵达。',
      ),
      text('This famous Inca site is in Peru.', '这处著名的印加遗址位于秘鲁。'),
    ],
    explanation: text(
      'Machu Picchu is a 15th-century Inca citadel in the Peruvian Andes, above the Urubamba River.',
      '马丘比丘是十五世纪的印加山地城寨，位于秘鲁安第斯山脉，俯瞰乌鲁班巴河。',
    ),
  },
  {
    id: 'great-wall',
    category: 'landmark',
    answers: {
      en: ['Great Wall', 'Great Wall of China', 'The Great Wall'],
      zh: ['长城', '万里长城', '中国长城', '長城', '萬里長城'],
    },
    clues: [
      text(
        'Many of the brick and stone sections visitors walk today were rebuilt during the Ming dynasty.',
        '今天游客步行的许多砖石城段，重建于明朝。',
      ),
      text(
        'It crosses northern China, from mountain passes near Beijing toward the drier interior.',
        '它横贯中国北方，从北京附近的山口一直延伸向更干旱的内陆。',
      ),
      text('Badaling is one of the most visited stretches and lies within reach of Beijing.', '八达岭是最常被参观的一段，距北京不远。'),
      text(
        'This long chain of fortifications is often counted among the wonders of the world.',
        '这道绵长的防御工事常被称作世界奇迹之一。',
      ),
    ],
    explanation: text(
      'The Great Wall is a series of fortifications across northern China. The best-preserved stone sections mostly date from the Ming dynasty.',
      '长城是横贯中国北方的一系列防御工程，保存最完整的砖石段落多建于明代。',
    ),
  },
  {
    id: 'colosseum',
    category: 'landmark',
    answers: {
      en: ['Colosseum', 'Coliseum', 'Flavian Amphitheatre', 'Flavian Amphitheater'],
      zh: ['罗马斗兽场', '斗兽场', '罗马圆形竞技场', '羅馬鬥獸場', '鬥獸場'],
    },
    clues: [
      text(
        'Emperor Vespasian ordered this amphitheater built, and Titus inaugurated it in 80 CE.',
        '韦斯巴芗皇帝下令修建这座圆形竞技场，提图斯于公元80年为其揭幕。',
      ),
      text(
        'It hosted gladiatorial games and could hold tens of thousands of spectators.',
        '这里曾举行角斗，可容纳数万名观众。',
      ),
      text('It stands in the ancient center of Rome.', '它位于罗马古城的中心。'),
      text('This oval Roman arena is one of Italy’s most famous landmarks.', '这座椭圆形的古罗马竞技场是意大利最著名的地标之一。'),
    ],
    explanation: text(
      'The Colosseum, formally the Flavian Amphitheatre, was inaugurated in Rome in 80 CE and held public games.',
      '罗马斗兽场的正式名称是弗拉维圆形剧场，公元80年在罗马揭幕，曾用于公共竞技。',
    ),
  },
  {
    id: 'petra',
    category: 'landmark',
    answers: { en: ['Petra'], zh: ['佩特拉'] },
    clues: [
      text(
        'Al-Khazneh, known in English as the Treasury, is carved into rose-red sandstone near the entrance.',
        '被称为“宝库”的卡兹尼神殿，雕凿在入口附近的玫瑰红色砂岩崖壁上。',
      ),
      text('The city was the capital of the Nabataean kingdom.', '这座城曾是纳巴泰王国的都城。'),
      text(
        'Visitors walk through a narrow gorge called the Siq to reach the carved facades.',
        '访客要穿过一条名叫锡克的狭窄峡谷，才能看见那些崖壁建筑。',
      ),
      text('This archaeological site in Jordan is sometimes called the Rose City.', '这处约旦考古遗址有时被称作玫瑰之城。'),
    ],
    explanation: text(
      'Petra was the Nabataean capital, carved into sandstone in what is now southern Jordan. The Siq leads toward the Treasury.',
      '佩特拉是纳巴泰王国的都城，开凿在今天约旦南部的砂岩中。锡克峡谷通向被称为宝库的崖壁建筑。',
    ),
  },
  {
    id: 'statue-of-liberty',
    category: 'landmark',
    answers: { en: ['Statue of Liberty'], zh: ['自由女神像', '自由女神'] },
    clues: [
      text('France gave this statue to the United States. It was dedicated in 1886.', '这是法国赠予美国的雕像，于1886年揭幕。'),
      text('Frédéric Auguste Bartholdi designed the figure.', '弗雷德里克·奥古斯特·巴托尔迪设计了这座人像。'),
      text('The robed figure stands on Liberty Island, torch raised over the harbor.', '这座身披长袍的人像矗立在自由岛上，火炬举向港湾。'),
      text('It is one of the most familiar symbols of the United States.', '它是美国最广为人知的象征之一。'),
    ],
    explanation: text(
      'The Statue of Liberty, “Liberty Enlightening the World,” was dedicated in New York Harbor in 1886. France gave it to the United States.',
      '自由女神像的全称是“自由照耀世界”，1886年矗立于纽约港，由法国赠予美国。',
    ),
  },
  {
    id: 'sydney-opera-house',
    category: 'landmark',
    answers: { en: ['Sydney Opera House'], zh: ['悉尼歌剧院', '悉尼歌劇院', '雪梨歌劇院'] },
    clues: [
      text('Danish architect Jørn Utzon designed its sail-like concrete shells.', '丹麦建筑师约恩·乌松设计了它如风帆般的混凝土壳体。'),
      text('The building stands on Bennelong Point, jutting into the harbor.', '建筑坐落在伸入海港的本纳朗角。'),
      text('Queen Elizabeth II opened this performing-arts building in 1973.', '伊丽莎白二世于1973年为这座表演艺术建筑揭幕。'),
      text('Its white shell roofs make it one of the most recognizable buildings on a harbor.', '白色的壳体屋顶让它成为海港边辨识度最高的建筑之一。'),
    ],
    explanation: text(
      'The Sydney Opera House opened in 1973 on Bennelong Point. Jørn Utzon designed the white shell roofs that face the harbor.',
      '悉尼歌剧院于1973年在本纳朗角启用。约恩·乌松设计了面向海港的白色壳体屋顶。',
    ),
  },
]

const questionsById = new Map(questions.map((question) => [question.id, question]))

export function getQuestion(id: string): Question | undefined {
  return questionsById.get(id)
}
