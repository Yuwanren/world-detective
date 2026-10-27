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
        'The capital is one of the world’s largest cities and stands on the site of the old Aztec capital.',
        '首都是世界上最大的城市之一，建在昔日阿兹特克都城的原址上。',
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
      'Mexico links North and Central America. Indigenous civilizations and later Spanish colonial history meet across its territory. Mexico City is the capital.',
      '墨西哥连接北美洲与中美洲，古老文明和后来的西班牙殖民历史在这里交汇。首都是墨西哥城。',
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
  {
    id: 'peru',
    category: 'country',
    answers: { en: ['Peru'], zh: ['秘鲁'] },
    clues: [
      text(
        'An ancient Andean civilization built an extensive road network across this country’s mountainous terrain.',
        '古代安第斯文明曾在这个国家的山地修建庞大的道路网络。',
      ),
      text(
        'Its territory includes tropical rainforest, high mountain ranges, and a long Pacific coastline.',
        '这个国家同时拥有热带雨林、高耸山脉以及绵长的太平洋海岸。',
      ),
      text(
        'The famous archaeological site of Machu Picchu lies within its borders.',
        '著名的马丘比丘考古遗址就位于这个国家境内。',
      ),
      text('Its cuisine includes ceviche, and its currency is the sol.', '这个国家的特色美食包括酸橘汁腌鱼，使用的货币是索尔。'),
    ],
    explanation: text(
      'This South American country stretches from the Pacific coast across the Andes into the Amazon Basin. Its capital is Lima.',
      '这个南美国家从太平洋沿岸横跨安第斯山脉，延伸至亚马逊流域，首都是利马。',
    ),
  },
  {
    id: 'south-korea',
    category: 'country',
    answers: { en: ['South Korea', 'Republic of Korea'], zh: ['韩国', '大韩民国'] },
    clues: [
      text(
        'This East Asian country occupies the southern portion of a peninsula divided near the 38th parallel.',
        '这个东亚国家位于一座在北纬三十八度附近被分隔的半岛南部。',
      ),
      text(
        'Its largest island is known for volcanic landscapes and Hallasan, the country’s highest mountain.',
        '这个国家最大的岛屿以火山地貌闻名，岛上的汉拿山是全国最高峰。',
      ),
      text(
        'Its global cultural exports include K-pop, Korean cinema, and television dramas.',
        '这个国家的全球文化输出包括流行音乐、电影以及电视剧。',
      ),
      text(
        'Its capital is a major metropolis known for royal palaces and advanced technology.',
        '它的首都是一座以王宫古迹和先进科技闻名的大都市。',
      ),
    ],
    explanation: text(
      'The Republic of Korea occupies the southern part of the Korean Peninsula, with Seoul as its capital.',
      '大韩民国位于朝鲜半岛南部，首都是首尔。',
    ),
  },
  {
    id: 'argentina',
    category: 'country',
    answers: { en: ['Argentina', 'Argentine Republic'], zh: ['阿根廷', '阿根廷共和国'] },
    clues: [
      text(
        'Its western border follows a long stretch of the Andes, including the highest peak outside Asia.',
        '它的西部边界沿着安第斯山脉延伸，境内有亚洲以外海拔最高的山峰。',
      ),
      text(
        'The vast grasslands of the Pampas have historically supported extensive cattle ranching.',
        '广阔的潘帕斯草原长期以来支撑着大规模的牧牛业。',
      ),
      text(
        'Tango developed in the Río de la Plata region and became an internationally recognized cultural symbol.',
        '探戈起源于拉普拉塔河地区，后来成为广受国际认可的文化象征。',
      ),
      text('Its national football team won the 2022 FIFA World Cup.', '这个国家的男子国家足球队赢得了2022年国际足联世界杯。'),
    ],
    explanation: text(
      'This South American nation spans subtropical regions, temperate plains, and Patagonia. Its capital is Buenos Aires.',
      '这个南美国家横跨亚热带地区、温带平原和巴塔哥尼亚，首都是布宜诺斯艾利斯。',
    ),
  },
  {
    id: 'thailand',
    category: 'country',
    answers: { en: ['Thailand', 'Kingdom of Thailand'], zh: ['泰国', '泰王国'] },
    clues: [
      text(
        'Its northern highlands border Myanmar and Laos, while its southern territory extends down a narrow peninsula.',
        '它的北部高地与缅甸和老挝接壤，南部领土则沿狭长半岛延伸。',
      ),
      text(
        'The Chao Phraya River flows through its central plain toward the gulf on its southeastern coast.',
        '湄南河流经它的中央平原，最终注入东南侧的海湾。',
      ),
      text(
        'Theravada Buddhism has strongly influenced its temples, festivals, and traditional culture.',
        '上座部佛教深刻影响了这个国家的寺庙、节庆与传统文化。',
      ),
      text(
        'Its capital is famous for ornate temples, floating markets, and spicy street food.',
        '它的首都以华丽寺庙、水上市场和辛辣街头美食闻名。',
      ),
    ],
    explanation: text(
      'This Southeast Asian kingdom lies between mainland neighbors and the Malay Peninsula. Its capital is Bangkok.',
      '这个东南亚王国位于中南半岛与马来半岛北部，首都是曼谷。',
    ),
  },
  {
    id: 'switzerland',
    category: 'country',
    answers: { en: ['Switzerland', 'Swiss Confederation'], zh: ['瑞士', '瑞士联邦'] },
    clues: [
      text(
        'Its territory contains numerous Alpine passes connecting major European regions.',
        '这个国家境内拥有众多阿尔卑斯山口，连接欧洲多个重要区域。',
      ),
      text(
        'It has four national languages: German, French, Italian, and Romansh.',
        '这个国家有四种国家语言，分别是德语、法语、意大利语和罗曼什语。',
      ),
      text(
        'International organizations and major financial institutions have offices in Geneva and Zurich.',
        '日内瓦和苏黎世拥有国际组织以及重要金融机构的办事处。',
      ),
      text(
        'It is famous for precision watches, chocolate, and a long tradition of political neutrality.',
        '这个国家以精密手表、巧克力和长期的政治中立传统闻名。',
      ),
    ],
    explanation: text(
      'This landlocked Alpine country has Bern as its federal city and is known for its multilingual population.',
      '这个内陆阿尔卑斯山国家以伯尔尼作为联邦城市，并以多语言社会而闻名。',
    ),
  },
  {
    id: 'new-delhi',
    category: 'city',
    answers: { en: ['New Delhi'], zh: ['新德里'] },
    clues: [
      text(
        'Its planned avenues and government district were developed as the imperial capital in the early twentieth century.',
        '它的规划大道和政府区域在二十世纪初作为帝国首都建设。',
      ),
      text(
        'The monumental India Gate stands along one of its prominent ceremonial avenues.',
        '宏伟的印度门矗立在这座城市一条重要的礼仪大道旁。',
      ),
      text(
        'It forms the seat of the national government of the world’s most populous country.',
        '这里是世界人口最多国家的中央政府所在地。',
      ),
      text(
        'Its famous landmarks include Rashtrapati Bhavan and the Parliament complex.',
        '这座城市的重要建筑包括总统府和议会建筑群。',
      ),
    ],
    explanation: text(
      'New Delhi is the capital of India and forms part of the larger National Capital Territory alongside the historic urban area.',
      '新德里是印度首都，属于更大的国家首都辖区，并与历史悠久的城市区域相连。',
    ),
  },
  {
    id: 'istanbul',
    category: 'city',
    answers: { en: ['Istanbul'], zh: ['伊斯坦布尔'] },
    clues: [
      text(
        'Its historic peninsula contains architectural layers from Byzantine and Ottoman imperial periods.',
        '它的历史半岛保留了拜占庭与奥斯曼帝国时期叠加形成的建筑遗产。',
      ),
      text(
        'The Bosporus separates its European and Asian sides while linking two major seas.',
        '博斯普鲁斯海峡将它的欧洲部分和亚洲部分分开，同时连接两片重要海域。',
      ),
      text(
        'A celebrated domed monument nearby served as a major Byzantine church and later an Ottoman mosque.',
        '这里一座著名的穹顶建筑曾是重要的拜占庭教堂，后来成为奥斯曼清真寺。',
      ),
      text(
        'It is Turkey’s largest city, famous for bustling bazaars and ferry crossings between continents.',
        '它是土耳其最大的城市，以热闹的集市和横跨两大洲的渡轮航线闻名。',
      ),
    ],
    explanation: text(
      'This transcontinental metropolis lies along the Bosporus and has served as a major imperial center for centuries.',
      '这座横跨欧亚的都市坐落在博斯普鲁斯海峡沿岸，数百年来一直是重要的帝国中心。',
    ),
  },
  {
    id: 'lisbon',
    category: 'city',
    answers: { en: ['Lisbon'], zh: ['里斯本'] },
    clues: [
      text(
        'This Atlantic-facing capital grew into a major maritime center during the Age of Discoveries.',
        '这座面向大西洋的首都在大航海时代发展为重要的海上中心。',
      ),
      text(
        'Its historic waterfront district includes a monastery associated with Portuguese maritime exploration.',
        '它的历史滨水区域拥有一座与葡萄牙海洋探索历史密切相关的修道院。',
      ),
      text(
        'Yellow trams climb steep streets past tiled facades and viewpoints over the Tagus estuary.',
        '黄色有轨电车穿行于陡峭街道，经过彩色瓷砖立面和俯瞰塔霍河口的观景点。',
      ),
      text(
        'It is the capital of Portugal and is known for fado music and custard tarts.',
        '它是葡萄牙首都，以法朵音乐和葡式蛋挞而闻名。',
      ),
    ],
    explanation: text(
      'Portugal’s capital stands on the estuary of the Tagus River, overlooking the Atlantic Ocean.',
      '葡萄牙首都坐落在塔霍河入海口，面向大西洋，拥有悠久的航海历史。',
    ),
  },
  {
    id: 'marrakech',
    category: 'city',
    answers: { en: ['Marrakech', 'Marrakesh'], zh: ['马拉喀什'] },
    clues: [
      text(
        'Its historic medina contains traditional riads, narrow lanes, and elaborate carved plasterwork.',
        '它的历史老城拥有传统庭院住宅、狭窄巷道和精美的雕刻灰泥装饰。',
      ),
      text(
        'A famous square fills with storytellers, food stalls, and performers after sunset.',
        '一座著名广场在日落后聚集讲故事的人、餐饮摊位和表演者。',
      ),
      text(
        'The city’s red-toned walls and buildings have earned it a nickname associated with a warm color.',
        '这座城市的红色城墙和建筑让它获得了一个与暖色调相关的昵称。',
      ),
      text(
        'It is a major Moroccan destination for souks, mint tea, and views toward the Atlas Mountains.',
        '这里是摩洛哥的重要旅游目的地，以露天集市、薄荷茶和远眺阿特拉斯山脉的景色闻名。',
      ),
    ],
    explanation: text(
      'This historic Moroccan city lies west of the Atlas Mountains and is renowned for its medina and lively central square.',
      '这座摩洛哥历史名城位于阿特拉斯山脉以西，以老城和热闹的中心广场闻名。',
    ),
  },
  {
    id: 'vancouver',
    category: 'city',
    answers: { en: ['Vancouver'], zh: ['温哥华'] },
    clues: [
      text(
        'Its coastal setting places a major urban center between the Pacific Ocean and the Coast Mountains.',
        '它的沿海位置使这座大城市坐落于太平洋与海岸山脉之间。',
      ),
      text(
        'Stanley Park contains a seawall popular with walkers, cyclists, and views of the surrounding harbor.',
        '斯坦利公园拥有一条深受步行者和骑行者欢迎的海滨步道，可欣赏周围港湾景色。',
      ),
      text(
        'The city hosted the 2010 Winter Olympic and Paralympic Games.',
        '这座城市曾举办2010年冬季奥运会和冬季残奥会。',
      ),
      text(
        'It is a major Canadian gateway to the Pacific and is known for mountains and diverse food.',
        '它是加拿大面向太平洋的重要门户，以周围山景和多元美食闻名。',
      ),
    ],
    explanation: text(
      'This coastal city in British Columbia combines a major port with nearby mountains and extensive waterfront parks.',
      '这座位于不列颠哥伦比亚省的沿海城市兼具重要港口、近郊山脉和广阔的滨水公园。',
    ),
  },
  {
    id: 'dubai',
    category: 'city',
    answers: { en: ['Dubai'], zh: ['迪拜'] },
    clues: [
      text(
        'A historic trading settlement developed around a creek that opens into the Persian Gulf.',
        '一处历史贸易聚落围绕着一条通向波斯湾的河湾逐渐发展起来。',
      ),
      text(
        'The city has expanded into the desert with artificial islands and large-scale waterfront developments.',
        '这座城市向沙漠扩张，并建造了人工岛屿和大型滨水开发区。',
      ),
      text('It contains the world’s tallest building, completed in 2010.', '这里拥有世界最高的建筑，该建筑于2010年竣工。'),
      text(
        'It is a major international stopover known for luxury shopping and desert excursions.',
        '这里是重要的国际中转目的地，以奢华购物和沙漠旅行体验闻名。',
      ),
    ],
    explanation: text(
      'This emirate’s largest city is a global business and tourism hub on the southeastern coast of the Persian Gulf.',
      '这座酋长国的最大城市位于波斯湾东南岸，是全球重要的商业和旅游中心。',
    ),
  },
  {
    id: 'angkor-wat',
    category: 'landmark',
    answers: { en: ['Angkor Wat'], zh: ['吴哥窟'] },
    clues: [
      text(
        'This monumental temple complex was built in the early twelfth century under the Khmer Empire.',
        '这座宏伟的寺庙建筑群建于十二世纪初期，属于高棉帝国时期。',
      ),
      text(
        'Its galleries contain extensive bas-reliefs depicting Hindu epics and historical processions.',
        '它的回廊拥有大量浅浮雕，描绘印度教史诗和历史性的队列场景。',
      ),
      text('Five lotus-shaped towers dominate its famous silhouette.', '五座形似莲花的塔楼构成了这里极具辨识度的轮廓。'),
      text(
        'It is Cambodia’s best-known temple and appears on the national flag.',
        '它是柬埔寨最著名的寺庙，并出现在该国国旗上。',
      ),
    ],
    explanation: text(
      'This vast religious monument near Siem Reap began as a Hindu temple and later became an important Buddhist site.',
      '这座位于暹粒附近的宏大宗教遗迹最初是一座印度教寺庙，后来成为重要的佛教圣地。',
    ),
  },
  {
    id: 'christ-the-redeemer',
    category: 'landmark',
    answers: { en: ['Christ the Redeemer'], zh: ['救世基督像', '里约热内卢基督像'] },
    clues: [
      text(
        'This monumental Art Deco statue was inaugurated in 1931 atop a mountain in southeastern Brazil.',
        '这座宏伟的装饰艺术风格雕像于1931年落成，坐落在巴西东南部的一座山顶。',
      ),
      text(
        'Its reinforced-concrete structure is covered with triangular soapstone tiles.',
        '它的钢筋混凝土结构表面覆盖着三角形皂石瓷片。',
      ),
      text(
        'The figure stands with outstretched arms above a famous coastal metropolis.',
        '这尊雕像张开双臂，俯瞰一座著名的沿海大都市。',
      ),
      text(
        'It is one of the most recognizable religious monuments in South America.',
        '它是南美洲最具辨识度的宗教纪念建筑之一。',
      ),
    ],
    explanation: text(
      'This colossal statue overlooks Rio de Janeiro from the summit of Corcovado Mountain.',
      '这座巨型雕像矗立在科尔科瓦多山顶，俯瞰里约热内卢及其海湾。',
    ),
  },
  {
    id: 'mount-fuji',
    category: 'landmark',
    answers: { en: ['Mount Fuji', 'Fuji-san'], zh: ['富士山'] },
    clues: [
      text(
        'This stratovolcano has a summit elevation of approximately 3,776 meters above sea level.',
        '这座层状火山的山顶海拔约为3776米。',
      ),
      text(
        'Its symmetrical volcanic cone is visible from parts of the Tokaido corridor in clear weather.',
        '天气晴朗时，从东海道部分地区可以看到它对称的火山锥形轮廓。',
      ),
      text(
        'The mountain has inspired centuries of Japanese paintings, poetry, and pilgrimage traditions.',
        '这座山数百年来一直启发着日本绘画、诗歌和朝圣传统。',
      ),
      text(
        'It is Japan’s highest mountain and a globally recognized symbol of the country.',
        '它是日本最高的山峰，也是全球广泛认可的日本象征。',
      ),
    ],
    explanation: text(
      'This iconic volcanic peak lies west of Tokyo and is a UNESCO World Heritage cultural site.',
      '这座标志性火山位于东京以西，并被联合国教科文组织列为世界文化遗产。',
    ),
  },
  {
    id: 'sagrada-familia',
    category: 'landmark',
    answers: { en: ['Sagrada Família', 'Basilica of the Sagrada Família'], zh: ['圣家堂', '圣家宗座圣殿'] },
    clues: [
      text(
        'Construction began in 1882, and the design became closely associated with Catalan architect Antoni Gaudí.',
        '这座建筑始建于1882年，其设计与加泰罗尼亚建筑师安东尼·高迪密切相关。',
      ),
      text(
        'Its façades feature intricate stone sculptures depicting scenes from the life of Jesus.',
        '它的外立面拥有精细的石雕，描绘耶稣生平中的多个场景。',
      ),
      text(
        'Its interior uses branching columns and colored light to evoke a forest-like atmosphere.',
        '它的内部以分叉柱体和彩色光线营造出类似森林的氛围。',
      ),
      text(
        'This unfinished basilica is one of the most recognizable sights in Barcelona.',
        '这座尚未完全竣工的大教堂是巴塞罗那最具辨识度的景点之一。',
      ),
    ],
    explanation: text(
      'This monumental Catholic basilica is a defining work of Gaudí’s architecture in Barcelona, Spain.',
      '这座宏伟的天主教宗座圣殿是西班牙巴塞罗那最具代表性的高迪建筑作品。',
    ),
  },
  {
    id: 'burj-khalifa',
    category: 'landmark',
    answers: { en: ['Burj Khalifa'], zh: ['哈利法塔'] },
    clues: [
      text(
        'This skyscraper reached a height of 828 meters and opened to the public in January 2010.',
        '这座摩天大楼高度达到828米，并于2010年1月向公众开放。',
      ),
      text(
        'Its design incorporates setbacks inspired by the geometric patterns of regional architecture.',
        '它的设计采用层层退台结构，并借鉴了当地建筑中的几何图案。',
      ),
      text(
        'The tower dominates a large mixed-use district with a major shopping center and fountains.',
        '这座塔楼主宰着一个大型综合开发区，周围有大型购物中心和喷泉。',
      ),
      text(
        'It is the world’s tallest building and a defining feature of the Dubai skyline.',
        '它是世界最高的建筑，也是迪拜天际线最具代表性的景观。',
      ),
    ],
    explanation: text(
      'This supertall skyscraper rises in downtown Dubai and holds the record for the tallest completed building.',
      '这座超高层摩天大楼矗立在迪拜市中心，是目前最高的已建成建筑。',
    ),
  },
  {
    id: 'chichen-itza',
    category: 'landmark',
    answers: { en: ['Chichen Itza', 'Chichén Itzá'], zh: ['奇琴伊察'] },
    clues: [
      text(
        'This archaeological city flourished in the northern Yucatan Peninsula during the Classic and Postclassic Maya periods.',
        '这座考古遗址城市在玛雅古典时期与后古典时期的尤卡坦半岛北部繁荣发展。',
      ),
      text(
        'Its central stepped pyramid has stairways on four sides and a temple at the summit.',
        '它的中央阶梯金字塔四面设有阶梯，顶部建有一座神庙。',
      ),
      text(
        'During the equinoxes, sunlight can create a serpent-like effect along the pyramid’s staircase.',
        '在春分和秋分期间，阳光能够在金字塔阶梯旁形成类似蛇形的视觉效果。',
      ),
      text(
        'It is one of Mexico’s best-known Maya archaeological sites and a UNESCO World Heritage property.',
        '它是墨西哥最著名的玛雅考古遗址之一，也是联合国教科文组织世界遗产。',
      ),
    ],
    explanation: text(
      'This pre-Columbian Maya center lies in the Yucatan Peninsula and includes monumental temples and a large ceremonial ball court.',
      '这座前哥伦布时期的玛雅中心位于尤卡坦半岛，拥有宏伟神庙和大型仪式球场。',
    ),
  },
  {
    id: 'table-mountain',
    category: 'landmark',
    answers: { en: ['Table Mountain'], zh: ['桌山'] },
    clues: [
      text(
        'Its flat summit plateau forms part of a sandstone massif overlooking the southwestern tip of Africa.',
        '它平坦的山顶高原属于一片砂岩山体，俯瞰非洲大陆西南端附近的海岸。',
      ),
      text(
        'A distinctive cloud layer sometimes spills over its rim like a white tablecloth.',
        '有时一层独特的云雾会从它的山缘倾泻而下，宛如白色桌布。',
      ),
      text(
        'A cableway carries visitors toward panoramic views of the Atlantic coast and surrounding city.',
        '一条空中缆车线路将游客送往高处，欣赏大西洋海岸和周边城市的全景。',
      ),
      text(
        'This flat-topped mountain is the iconic natural backdrop of Cape Town.',
        '这座平顶山峰是开普敦最具代表性的自然背景。',
      ),
    ],
    explanation: text(
      'This sandstone mountain overlooks Cape Town and forms part of the Cape Floral Region’s remarkable biodiversity.',
      '这座砂岩山峰俯瞰开普敦，并属于生物多样性极为丰富的开普植物区的一部分。',
    ),
  },
  {
    id: 'moai-statues',
    category: 'landmark',
    answers: { en: ['Moai', 'Moai statues'], zh: ['摩艾石像', '复活节岛石像'] },
    clues: [
      text(
        'These monumental stone figures were carved by the Rapa Nui people from volcanic rock.',
        '这些宏伟的石像由拉帕努伊人使用火山岩雕刻而成。',
      ),
      text(
        'Many were placed on ceremonial platforms known as ahu along a remote Pacific island’s coastline.',
        '许多石像被安放在称为阿胡的仪式平台上，分布于一座偏远太平洋岛屿的海岸。',
      ),
      text(
        'Their oversized heads and elongated faces are among the world’s most recognizable archaeological images.',
        '它们夸张的头部和修长的面容，是世界上最容易辨认的考古形象之一。',
      ),
      text(
        'They are the iconic stone guardians associated with Rapa Nui, also called Easter Island.',
        '它们是拉帕努伊文化最具代表性的石像，也与复活节岛这一名称紧密相连。',
      ),
    ],
    explanation: text(
      'These statues were created by the Indigenous Rapa Nui people on a remote Chilean island in the southeastern Pacific.',
      '这些石像由原住民拉帕努伊人在东南太平洋的一座智利岛屿上创造。',
    ),
  },
  {
    id: 'neuschwanstein-castle',
    category: 'landmark',
    answers: { en: ['Neuschwanstein Castle'], zh: ['新天鹅堡'] },
    clues: [
      text(
        'This nineteenth-century royal residence was commissioned by Ludwig II of Bavaria.',
        '这座十九世纪的王室住所由巴伐利亚国王路德维希二世下令建造。',
      ),
      text(
        'Its romantic design drew inspiration from medieval legends and the operas of Richard Wagner.',
        '它的浪漫主义设计受到中世纪传说和理查德·瓦格纳歌剧的启发。',
      ),
      text(
        'The pale stone towers rise above wooded hills near the Alps in southern Germany.',
        '浅色石塔矗立在德国南部阿尔卑斯山附近的森林山丘之上。',
      ),
      text(
        'Its fairy-tale silhouette helped inspire the popular image of a storybook castle.',
        '它如童话般的轮廓帮助塑造了大众心目中经典故事书城堡的形象。',
      ),
    ],
    explanation: text(
      'This nineteenth-century palace stands above Hohenschwangau in Bavaria and is one of Germany’s most famous tourist attractions.',
      '这座十九世纪的宫殿坐落在巴伐利亚的霍恩施万高上方，是德国最著名的旅游景点之一。',
    ),
  },
  {
    id: 'iguazu-falls',
    category: 'landmark',
    answers: { en: ['Iguazu Falls', 'Iguaçu Falls'], zh: ['伊瓜苏瀑布', '伊瓜苏大瀑布'] },
    clues: [
      text(
        'This extensive waterfall system lies along a river marking part of the border between two South American countries.',
        '这片规模庞大的瀑布群位于一条河流上，该河流构成两个南美国家之间的部分边界。',
      ),
      text(
        'Its most dramatic section is a horseshoe-shaped chasm known as the Devil’s Throat.',
        '它最壮观的部分是一处马蹄形深谷，被称为魔鬼咽喉。',
      ),
      text(
        'Hundreds of cascades spread across a broad subtropical forest landscape.',
        '数百道瀑布分布在广阔的亚热带森林景观之中。',
      ),
      text(
        'It is a world-famous natural attraction shared by Argentina and Brazil.',
        '它是阿根廷和巴西共同拥有的世界著名自然景观。',
      ),
    ],
    explanation: text(
      'This spectacular waterfall system spans the border of Argentina and Brazil, surrounded by protected subtropical rainforest.',
      '这片壮观的瀑布群横跨阿根廷与巴西边界，周围环绕着受保护的亚热带雨林。',
    ),
  },
  {
    id: 'potala-palace',
    category: 'landmark',
    answers: { en: ['Potala Palace'], zh: ['布达拉宫'] },
    clues: [
      text(
        'This monumental complex was developed on a hill overlooking a high-altitude Himalayan city.',
        '这座宏伟建筑群建在一座俯瞰喜马拉雅高原城市的山丘之上。',
      ),
      text(
        'Its white and red sections historically served different religious and administrative functions.',
        '它的白色与红色建筑区域在历史上承担着不同的宗教和行政职能。',
      ),
      text(
        'It is closely associated with the Dalai Lamas and Tibetan Buddhist traditions.',
        '它与达赖喇嘛以及藏传佛教传统有着密切联系。',
      ),
      text(
        'Its vast palace silhouette dominates the skyline of Lhasa on the Tibetan Plateau.',
        '这座规模宏大的宫殿轮廓主宰着青藏高原拉萨的城市天际线。',
      ),
    ],
    explanation: text(
      'This historic palace complex in Lhasa is a major landmark of Tibetan architecture and a UNESCO World Heritage property.',
      '这座位于拉萨的历史宫殿建筑群是藏式建筑的重要代表，也是联合国教科文组织世界遗产。',
    ),
  },
  {
    id: 'indonesia',
    category: 'country',
    answers: { en: ['Indonesia', 'Republic of Indonesia'], zh: ['印度尼西亚', '印度尼西亚共和国'] },
    clues: [
      text(
        'This archipelagic nation spans both sides of the equator and lies along the Pacific Ring of Fire.',
        '这个群岛国横跨赤道两侧，并位于环太平洋火山地震带上。',
      ),
      text(
        'Its territory includes thousands of islands, with major population centers on Java and Sumatra.',
        '这个国家拥有数千座岛屿，爪哇岛和苏门答腊岛分布着重要人口中心。',
      ),
      text(
        'Komodo dragons survive naturally on several islands within its national territory.',
        '科莫多巨蜥在这个国家境内的若干岛屿上自然生存。',
      ),
      text(
        'Its capital is Jakarta, and its national motto means unity in diversity.',
        '它的首都是雅加达，国家格言表达了多元一体的理念。',
      ),
    ],
    explanation: text(
      'This Southeast Asian archipelago lies between the Indian and Pacific oceans and contains extensive tropical rainforests and volcanic landscapes. Jakarta is the capital.',
      '这个东南亚群岛国位于印度洋与太平洋之间，拥有广阔的热带雨林和火山地貌。首都是雅加达。',
    ),
  },
  {
    id: 'iceland',
    category: 'country',
    answers: { en: ['Iceland'], zh: ['冰岛'] },
    clues: [
      text(
        'This North Atlantic island lies astride the Mid-Atlantic Ridge, where tectonic plates gradually separate.',
        '这个北大西洋岛国位于大西洋中脊附近，两大板块在此逐渐分离。',
      ),
      text(
        'Its landscape features active volcanoes, extensive glaciers, geothermal fields, and powerful waterfalls.',
        '这里拥有活火山、广阔冰川、地热区以及气势磅礴的瀑布。',
      ),
      text(
        'The historic Althing, established in 930, is widely regarded as one of the world’s oldest parliamentary institutions.',
        '这里于公元930年建立的议会，被广泛认为是世界上历史最悠久的议会机构之一。',
      ),
      text(
        'Its capital is Reykjavik, and visitors often seek hot springs and northern lights.',
        '它的首都是雷克雅未克，游客常来这里体验温泉并观赏北极光。',
      ),
    ],
    explanation: text(
      'This Nordic island nation combines volcanic activity and glacial landscapes with a strong geothermal energy sector. Reykjavik is the capital.',
      '这个北欧岛国将活跃的火山活动与冰川景观结合起来，并广泛利用地热能源。首都是雷克雅未克。',
    ),
  },
  {
    id: 'new-zealand',
    category: 'country',
    answers: { en: ['New Zealand', 'Aotearoa'], zh: ['新西兰'] },
    clues: [
      text(
        'This South Pacific nation consists primarily of two large islands separated by a narrow strait.',
        '这个南太平洋国家主要由两座大型岛屿组成，两岛之间隔着一条狭窄海峡。',
      ),
      text(
        'Its South Island contains the Southern Alps, extensive glaciers, and deep fjords.',
        '它的南岛拥有南阿尔卑斯山脉、广阔冰川和深邃峡湾。',
      ),
      text(
        'The Māori language and traditions form an important part of its national identity.',
        '毛利语及毛利传统构成了这个国家民族认同的重要组成部分。',
      ),
      text(
        'Its capital is Wellington, and its national rugby team is famous for performing the haka.',
        '它的首都是惠灵顿，国家橄榄球队以赛前表演哈卡战舞而闻名。',
      ),
    ],
    explanation: text(
      'This island nation southeast of Australia is known for dramatic landscapes, distinctive wildlife, and Māori cultural heritage. Wellington is the capital.',
      '这个位于澳大利亚东南方向的岛国，以壮丽地貌、独特野生动物和毛利文化遗产闻名。首都是惠灵顿。',
    ),
  },
  {
    id: 'ethiopia',
    category: 'country',
    answers: { en: ['Ethiopia', 'Federal Democratic Republic of Ethiopia'], zh: ['埃塞俄比亚', '埃塞俄比亚联邦民主共和国'] },
    clues: [
      text(
        'Its northern highlands contain ancient rock-hewn churches and archaeological remains associated with the Aksumite civilization.',
        '它的北部高地拥有古老的岩石凿刻教堂，以及与阿克苏姆文明有关的考古遗迹。',
      ),
      text(
        'The Great Rift Valley crosses its territory, creating varied highland and lowland environments.',
        '东非大裂谷穿过这个国家，形成多样的高地与低地环境。',
      ),
      text(
        'Its coffee-growing traditions are closely associated with the historical origins of coffee cultivation.',
        '这里的咖啡种植传统与咖啡栽培的历史起源密切相关。',
      ),
      text(
        'Its capital is Addis Ababa, which hosts the headquarters of the African Union.',
        '它的首都是亚的斯亚贝巴，也是非洲联盟总部的所在地。',
      ),
    ],
    explanation: text(
      'This East African country has a long recorded history, distinctive highland ecosystems, and a major role in continental diplomacy. Addis Ababa is the capital.',
      '这个东非国家拥有悠久的历史、独特的高原生态系统，并在非洲大陆外交事务中发挥重要作用。首都是亚的斯亚贝巴。',
    ),
  },
  {
    id: 'croatia',
    category: 'country',
    answers: { en: ['Croatia', 'Republic of Croatia'], zh: ['克罗地亚', '克罗地亚共和国'] },
    clues: [
      text(
        'Its Adriatic coastline includes more than a thousand islands, islets, and reefs.',
        '它的亚得里亚海海岸拥有一千多个岛屿、小岛和礁石。',
      ),
      text(
        'Its territory contains the Plitvice Lakes, where a series of waterfalls connects turquoise lakes.',
        '它的境内有普利特维采湖群，一系列瀑布连接着色彩鲜艳的湖泊。',
      ),
      text(
        'The historic coastal city of Dubrovnik is famous for its fortified old town and stone walls.',
        '它的历史海滨城市杜布罗夫尼克以设防老城和石砌城墙闻名。',
      ),
      text(
        'Its capital is Zagreb, and its flag features a red-and-white checkerboard shield.',
        '它的首都是萨格勒布，国旗中央的盾徽带有红白相间的棋盘格图案。',
      ),
    ],
    explanation: text(
      'This southeastern European country combines an Adriatic coastline with historic towns, inland plains, and mountainous national parks. Zagreb is the capital.',
      '这个东南欧国家兼具亚得里亚海海岸、历史城镇、内陆平原和山地国家公园。首都是萨格勒布。',
    ),
  },
  {
    id: 'seoul',
    category: 'city',
    answers: { en: ['Seoul', 'Seoul Special City'], zh: ['首尔', '首尔特别市'] },
    clues: [
      text(
        'This major East Asian metropolis developed around the Han River and is surrounded by a ring of mountains.',
        '这座东亚大都市围绕汉江发展，周围环绕着一圈山脉。',
      ),
      text(
        'Its historic core contains royal residences built during the Joseon dynasty.',
        '它的历史核心区保存着朝鲜王朝时期修建的王室宫殿。',
      ),
      text(
        'A distinctive observation tower stands on Namsan, overlooking its dense urban landscape.',
        '南山上的一座标志性观景塔俯瞰着这座城市密集的城区。',
      ),
      text(
        'It is the capital of South Korea and a global center for K-pop and consumer technology.',
        '它是韩国首都，也是流行音乐和消费科技的全球中心。',
      ),
    ],
    explanation: text(
      'This capital city on the Korean Peninsula combines historic royal palaces with extensive public transit and modern business districts.',
      '这座位于朝鲜半岛的首都将历史王宫、完善的公共交通与现代商业区融为一体。',
    ),
  },
  {
    id: 'cairo',
    category: 'city',
    answers: { en: ['Cairo'], zh: ['开罗'] },
    clues: [
      text(
        'This historic metropolis developed near the point where the Nile Valley opens into its broad delta.',
        '这座历史名城位于尼罗河谷向广阔三角洲过渡的区域附近。',
      ),
      text(
        'Its historic Islamic quarter contains medieval mosques, schools, and bustling traditional markets.',
        '它的历史伊斯兰城区拥有中世纪清真寺、学校和热闹的传统市场。',
      ),
      text(
        'The Giza pyramid complex lies on the desert plateau just beyond its western urban area.',
        '吉萨金字塔群位于这座城市西部城区之外的沙漠高原上。',
      ),
      text(
        'It is Egypt’s capital and the largest metropolitan center in the Arab world by population.',
        '它是埃及首都，也是阿拉伯世界人口最多的都市中心。',
      ),
    ],
    explanation: text(
      'This major North African city sits along the Nile and has long served as a center of government, scholarship, and trade.',
      '这座北非重要城市坐落在尼罗河沿岸，长期以来一直是政府、学术与贸易中心。',
    ),
  },
  {
    id: 'prague',
    category: 'city',
    answers: { en: ['Prague'], zh: ['布拉格'] },
    clues: [
      text(
        'This Central European city developed along both banks of the Vltava River, with a historic castle complex on a hill.',
        '这座中欧城市沿伏尔塔瓦河两岸发展，山丘上坐落着一处历史悠久的城堡建筑群。',
      ),
      text(
        'Its medieval astronomical clock has marked time on the facade of the Old Town Hall since the fifteenth century.',
        '它的中世纪天文钟自十五世纪以来一直装饰着老城市政厅的外墙。',
      ),
      text(
        'The Charles Bridge is lined with statues and connects the historic districts across the river.',
        '查理大桥两侧排列着雕像，连接着河流两岸的历史城区。',
      ),
      text(
        'It is the capital of the Czech Republic and is famous for Gothic spires and historic beer halls.',
        '它是捷克共和国首都，以哥特式尖塔和历史悠久的啤酒馆闻名。',
      ),
    ],
    explanation: text(
      'This Central European capital is renowned for its preserved medieval center, monumental bridges, and diverse architectural styles.',
      '这座中欧首都以保存完好的中世纪中心区、宏伟桥梁和多样建筑风格闻名。',
    ),
  },
  {
    id: 'cusco',
    category: 'city',
    answers: { en: ['Cusco', 'Cuzco'], zh: ['库斯科'] },
    clues: [
      text(
        'This high-altitude Andean city preserves finely fitted stone walls built before the Spanish conquest.',
        '这座安第斯高原城市保存着西班牙征服之前建造的精密拼接石墙。',
      ),
      text(
        'Its historic center includes the remains of a major imperial temple beneath a colonial religious complex.',
        '它的历史中心保留着一座重要帝国神庙的遗迹，上方建有殖民时期的宗教建筑群。',
      ),
      text('It served as the political and religious center of the Inca Empire.', '这里曾是印加帝国的政治与宗教中心。'),
      text(
        'It is a major gateway for travelers heading into a nearby sacred valley and its Inca ruins.',
        '这里是游客前往附近印加遗址和圣谷的重要门户。',
      ),
    ],
    explanation: text(
      'This historic city in southeastern Peru combines Inca stonework with Spanish colonial architecture at an elevation of about 3,400 meters.',
      '这座位于秘鲁东南部的历史名城海拔约3400米，融合了印加石建筑与西班牙殖民建筑。',
    ),
  },
  {
    id: 'kyiv',
    category: 'city',
    answers: { en: ['Kyiv', 'Kiev'], zh: ['基辅'] },
    clues: [
      text(
        'This Eastern European city developed along the Dnieper River and contains hills overlooking its broad valley.',
        '这座东欧城市沿第聂伯河发展，城内丘陵可以俯瞰宽阔的河谷。',
      ),
      text(
        'Its historic religious complex includes a monastery famous for underground caves and golden-domed churches.',
        '它的一处历史宗教建筑群以地下洞穴和金色圆顶教堂而闻名。',
      ),
      text(
        'The Saint Sophia Cathedral complex preserves important medieval religious art and architecture.',
        '圣索菲亚大教堂建筑群保存着重要的中世纪宗教艺术与建筑。',
      ),
      text(
        'It is the capital of Ukraine and a major cultural center of Eastern Europe.',
        '它是乌克兰首都，也是东欧重要的文化中心。',
      ),
    ],
    explanation: text(
      'This historic capital on the Dnieper River played a major role in the development of East Slavic states and Orthodox Christianity.',
      '这座位于第聂伯河沿岸的历史首都，在东斯拉夫国家的发展和东正教传播过程中发挥了重要作用。',
    ),
  },
  {
    id: 'golden-gate-bridge',
    category: 'landmark',
    answers: { en: ['Golden Gate Bridge'], zh: ['金门大桥'] },
    clues: [
      text(
        'This suspension bridge opened in 1937 and spans a strait connecting a large bay with the Pacific Ocean.',
        '这座悬索桥于1937年通车，横跨连接大型海湾与太平洋的海峡。',
      ),
      text(
        'Its distinctive international orange color helps improve visibility in the region’s frequent coastal fog.',
        '它独特的国际橙色有助于在当地频繁出现的海岸雾气中提高能见度。',
      ),
      text(
        'Its two main towers rise above the water at the entrance to San Francisco Bay.',
        '它的两座主塔高耸于旧金山湾入口的水面之上。',
      ),
      text('It is one of the most recognizable bridges in the United States.', '它是美国最具辨识度的桥梁之一。'),
    ],
    explanation: text(
      'This suspension bridge connects San Francisco with Marin County across the Golden Gate strait in California.',
      '这座悬索桥横跨加利福尼亚州的金门海峡，连接旧金山与马林县。',
    ),
  },
  {
    id: 'acropolis-of-athens',
    category: 'landmark',
    answers: { en: ['Acropolis of Athens', 'Athenian Acropolis'], zh: ['雅典卫城'] },
    clues: [
      text(
        'This fortified rocky outcrop contains monuments primarily associated with the fifth century BCE.',
        '这座设防岩丘拥有多处主要建于公元前五世纪的历史纪念建筑。',
      ),
      text(
        'Its most famous temple was dedicated to Athena, the ancient Greek goddess associated with wisdom.',
        '这里最著名的神庙供奉着与智慧相关的古希腊女神雅典娜。',
      ),
      text(
        'The monumental gateway and surviving marble columns dominate a hill above the surrounding urban landscape.',
        '宏伟的入口建筑和保存下来的大理石柱主宰着城市上方的一座山丘。',
      ),
      text(
        'It is a defining symbol of classical Greek civilization overlooking the Greek capital.',
        '它是古典希腊文明的标志性象征，俯瞰着希腊首都。',
      ),
    ],
    explanation: text(
      'This ancient citadel occupies a rocky hill in Athens and contains the Parthenon and other major classical monuments.',
      '这座古代城堡位于雅典的一座岩丘上，拥有帕特农神庙及其他重要的古典建筑遗迹。',
    ),
  },
  {
    id: 'pyramids-of-giza',
    category: 'landmark',
    answers: { en: ['Pyramids of Giza', 'Giza pyramid complex'], zh: ['吉萨金字塔群', '吉萨金字塔'] },
    clues: [
      text(
        'These monumental royal tombs were built during Egypt’s Fourth Dynasty in the Old Kingdom.',
        '这些宏伟的王室陵墓建于埃及古王国时期的第四王朝。',
      ),
      text(
        'The largest structure in the group was originally about 146.6 meters tall.',
        '这组建筑中最大的一座最初高度约为146.6米。',
      ),
      text(
        'A monumental limestone creature with a human head and a lion’s body stands nearby.',
        '附近矗立着一尊由石灰岩雕刻而成、拥有人头和狮身的巨大雕像。',
      ),
      text(
        'They are among the most famous ancient monuments on the outskirts of Cairo.',
        '它们是开罗郊外最著名的古代纪念建筑之一。',
      ),
    ],
    explanation: text(
      'This ancient royal necropolis on the Giza Plateau includes three principal pyramids and the Great Sphinx.',
      '这座位于吉萨高原的古代王室墓地包括三座主要金字塔以及著名的狮身人面像。',
    ),
  },
  {
    id: 'stonehenge',
    category: 'landmark',
    answers: { en: ['Stonehenge'], zh: ['巨石阵'] },
    clues: [
      text(
        'This prehistoric monument was constructed in several stages over many centuries during the Neolithic and Bronze Age.',
        '这座史前遗迹在新石器时代和青铜时代经历了多个阶段，历时数百年建成。',
      ),
      text(
        'Its circular arrangement combines massive sarsen stones with smaller bluestones transported from distant regions.',
        '它的环形布局将巨大的砂岩石块与从遥远地区运来的较小蓝石结合起来。',
      ),
      text(
        'Some of its principal alignments correspond to the positions of the summer solstice sunrise and winter solstice sunset.',
        '它的一些主要排列方向与夏至日出和冬至日落的位置相对应。',
      ),
      text(
        'This famous prehistoric stone circle stands on Salisbury Plain in southern England.',
        '这座著名的史前石圈矗立在英格兰南部的索尔兹伯里平原上。',
      ),
    ],
    explanation: text(
      'This prehistoric ceremonial monument in Wiltshire is one of the world’s most famous archaeological sites.',
      '这座位于威尔特郡的史前仪式遗迹，是世界上最著名的考古遗址之一。',
    ),
  },
  {
    id: 'burj-al-arab',
    category: 'landmark',
    answers: { en: ['Burj Al Arab'], zh: ['帆船酒店', '阿拉伯塔'] },
    clues: [
      text(
        'This luxury hotel opened in 1999 on an artificial island connected to the mainland by a private bridge.',
        '这家豪华酒店于1999年开业，坐落在人造岛上，并通过专用桥梁连接大陆。',
      ),
      text(
        'Its structure uses a distinctive silhouette inspired by the sail of a traditional regional vessel.',
        '它的建筑轮廓取材于当地传统船只的帆，具有鲜明的造型特征。',
      ),
      text(
        'Its exterior rises above the Arabian Gulf near Jumeirah Beach.',
        '它的外部结构矗立在阿拉伯湾沿岸，靠近朱美拉海滩。',
      ),
      text('It is one of the most recognizable luxury hotels in Dubai.', '它是迪拜最具辨识度的豪华酒店之一。'),
    ],
    explanation: text(
      'This sail-shaped luxury hotel stands on an artificial island off the coast of Dubai in the United Arab Emirates.',
      '这座帆形豪华酒店坐落于阿联酋迪拜海岸外的一座人工岛上。',
    ),
  },
  {
    id: 'sydney-harbour-bridge',
    category: 'landmark',
    answers: { en: ['Sydney Harbour Bridge'], zh: ['悉尼海港大桥'] },
    clues: [
      text(
        'This steel through-arch bridge opened in 1932 and spans a major natural harbor in southeastern Australia.',
        '这座钢制拱桥于1932年通车，横跨澳大利亚东南部的一处重要天然海港。',
      ),
      text(
        'Its arch and suspended roadway form a distinctive silhouette beside the city’s central waterfront.',
        '它的拱形结构和悬挂式桥面在城市中心滨水区旁形成鲜明轮廓。',
      ),
      text(
        'Visitors can climb designated routes along the arch for elevated views of the harbor.',
        '游客可以沿指定路线攀登拱桥，从高处欣赏海港全景。',
      ),
      text(
        'It is a famous Australian landmark situated near the country’s iconic performing arts building.',
        '它是澳大利亚著名地标，位于该国标志性表演艺术建筑附近。',
      ),
    ],
    explanation: text(
      'This major steel arch bridge links the central business district with the North Shore across Sydney Harbour.',
      '这座大型钢拱桥横跨悉尼海港，连接中央商务区与北岸地区。',
    ),
  },
  {
    id: 'petronas-towers',
    category: 'landmark',
    answers: { en: ['Petronas Twin Towers', 'Petronas Towers'], zh: ['吉隆坡双子塔', '国油双峰塔', '双子塔'] },
    clues: [
      text(
        'These twin skyscrapers were completed in the late twentieth century and use geometric forms inspired by Islamic design.',
        '这两座双塔摩天大楼于二十世纪末竣工，建筑几何形态受到伊斯兰设计的启发。',
      ),
      text(
        'A double-deck skybridge connects the towers at elevated levels above the city.',
        '一座双层空中连廊在城市上方连接两座塔楼。',
      ),
      text(
        'They were once the world’s tallest buildings and remain among the most recognizable twin towers.',
        '它们曾是世界最高建筑，至今仍是最具辨识度的双塔建筑之一。',
      ),
      text('They dominate the skyline of Kuala Lumpur in Malaysia.', '它们主宰着马来西亚吉隆坡的城市天际线。'),
    ],
    explanation: text(
      'These 452-meter twin skyscrapers stand in central Kuala Lumpur and house offices, shopping facilities, and visitor attractions.',
      '这两座高452米的双塔摩天大楼位于吉隆坡市中心，内部设有办公空间、购物设施和游客景点。',
    ),
  },
  {
    id: 'leaning-tower-of-pisa',
    category: 'landmark',
    answers: { en: ['Leaning Tower of Pisa'], zh: ['比萨斜塔'] },
    clues: [
      text(
        'Construction of this freestanding bell tower began in 1173, and its foundation settled unevenly during building.',
        '这座独立钟楼于1173年开始建造，施工过程中地基发生了不均匀沉降。',
      ),
      text(
        'Its cylindrical structure contains a series of open arcades arranged across several stories.',
        '它的圆柱形结构由多个楼层的开放式拱廊组成。',
      ),
      text(
        'Engineers carried out stabilization work to reduce the risk of further dangerous tilting.',
        '工程师曾实施加固工程，以降低它继续发生危险倾斜的风险。',
      ),
      text(
        'It is the famously tilted bell tower in the Italian city of Pisa.',
        '它是意大利比萨市那座以明显倾斜闻名的钟楼。',
      ),
    ],
    explanation: text(
      'This medieval bell tower forms part of the Piazza del Duomo complex in Pisa, Tuscany.',
      '这座中世纪钟楼属于意大利托斯卡纳地区比萨主教座堂广场建筑群的一部分。',
    ),
  },
  {
    id: 'mount-kilimanjaro',
    category: 'landmark',
    answers: { en: ['Mount Kilimanjaro', 'Kilimanjaro'], zh: ['乞力马扎罗山'] },
    clues: [
      text(
        'This dormant volcanic massif has three volcanic cones and rises to approximately 5,895 meters above sea level.',
        '这座休眠火山山体拥有三个火山锥，最高处海拔约5895米。',
      ),
      text(
        'Its upper slopes historically supported glaciers despite its location close to the equator.',
        '尽管它靠近赤道，其高处山坡历史上仍分布着冰川。',
      ),
      text(
        'Its ecological zones range from cultivated foothills to montane forest, alpine desert, and a high summit.',
        '它的生态带从耕作山麓延伸到山地森林、高山荒漠和高海拔山顶区域。',
      ),
      text(
        'It is Africa’s highest mountain and rises above the surrounding plains of Tanzania.',
        '它是非洲最高的山峰，高耸于坦桑尼亚周围的平原之上。',
      ),
    ],
    explanation: text(
      'This isolated volcanic massif in northeastern Tanzania is a UNESCO World Heritage site and a major mountaineering destination.',
      '这座位于坦桑尼亚东北部的孤立火山山体是联合国教科文组织世界遗产，也是重要的登山目的地。',
    ),
  },
  {
    id: 'mount-rushmore',
    category: 'landmark',
    answers: { en: ['Mount Rushmore', 'Mount Rushmore National Memorial'], zh: ['总统山', '拉什莫尔山国家纪念公园'] },
    clues: [
      text(
        'This monumental sculpture was carved into granite in the Black Hills between 1927 and 1941.',
        '这座宏伟雕塑于1927年至1941年间雕刻在黑山地区的花岗岩上。',
      ),
      text(
        'The rock faces depict four former presidents of the United States.',
        '岩壁上的巨大人像描绘了美国历史上的四位前总统。',
      ),
      text(
        'The figures represent George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln.',
        '这些人像分别代表乔治·华盛顿、托马斯·杰斐逊、西奥多·罗斯福和亚伯拉罕·林肯。',
      ),
      text(
        'It is a famous national memorial in South Dakota, surrounded by forested mountain scenery.',
        '它是南达科他州著名的国家纪念地，周围环绕着森林覆盖的山地景观。',
      ),
    ],
    explanation: text(
      'This monumental granite carving in the Black Hills commemorates four presidents associated with major periods of United States history.',
      '这座位于黑山地区的宏伟花岗岩雕刻纪念了四位与美国历史重要时期相关的总统。',
    ),
  },
  {
    id: 'forbidden-city',
    category: 'landmark',
    answers: { en: ['Forbidden City'], zh: ['故宫', '紫禁城'] },
    clues: [
      text(
        'This vast palace complex was constructed during the early fifteenth century under the Ming dynasty.',
        '这座规模宏大的宫殿建筑群建于十五世纪初的明朝时期。',
      ),
      text(
        'Its layout follows a central north-south axis and includes numerous courtyards and ceremonial halls.',
        '它的布局沿南北中轴线展开，包含大量庭院和举行典礼的殿堂。',
      ),
      text(
        'It served as the imperial residence for successive Ming and Qing emperors.',
        '它曾是明清两代多位皇帝的皇宫住所。',
      ),
      text(
        'It is a major historical attraction at the heart of Beijing, directly north of Tiananmen.',
        '它是北京中心区域的重要历史景点，位于天安门正北方向。',
      ),
    ],
    explanation: text(
      'This former imperial palace is one of the world’s largest surviving palace complexes and houses the Palace Museum.',
      '这座昔日的皇家宫殿是世界上现存规模最大的宫殿建筑群之一，如今设有故宫博物院。',
    ),
  },
  {
    id: 'alhambra',
    category: 'landmark',
    answers: { en: ['Alhambra'], zh: ['阿尔罕布拉宫'] },
    clues: [
      text(
        'This fortified palace complex developed under the Nasrid dynasty in medieval southern Iberia.',
        '这座设防宫殿建筑群在中世纪伊比利亚半岛南部的纳斯里德王朝时期发展起来。',
      ),
      text(
        'Its interiors feature intricate geometric tilework, carved stucco, and courtyards with fountains.',
        '它的内部装饰包括精细的几何瓷砖、雕刻灰泥以及设有喷泉的庭院。',
      ),
      text(
        'The Court of the Lions contains a celebrated fountain supported by sculpted stone lions.',
        '狮子庭院内有一座著名喷泉，由雕刻的石狮支撑。',
      ),
      text(
        'It overlooks Granada from a hill in Andalusia and is a celebrated monument of Islamic architecture.',
        '它坐落于安达卢西亚的一座山丘上俯瞰格拉纳达，是著名的伊斯兰建筑遗产。',
      ),
    ],
    explanation: text(
      'This medieval palace and fortress complex in Granada preserves exceptional Nasrid architecture and gardens.',
      '这座位于格拉纳达的中世纪宫殿与堡垒建筑群，保存着杰出的纳斯里德建筑和园林。',
    ),
  },
  {
    id: 'brandenburg-gate',
    category: 'landmark',
    answers: { en: ['Brandenburg Gate'], zh: ['勃兰登堡门'] },
    clues: [
      text(
        'This neoclassical monument was commissioned by a Prussian king and completed in 1791.',
        '这座新古典主义纪念建筑由普鲁士国王下令建造，并于1791年完工。',
      ),
      text(
        'Its design was inspired by the monumental gateways of ancient Greek architecture.',
        '它的设计灵感来自古希腊建筑中宏伟的纪念性门楼。',
      ),
      text(
        'During the Cold War, it stood near the boundary separating the eastern and western sectors of a divided city.',
        '冷战时期，它位于一座分裂城市东西两部分的分界线附近。',
      ),
      text(
        'It has become a major symbol of German reunification in the capital city.',
        '它已经成为德国统一的重要象征，坐落于该国首都。',
      ),
    ],
    explanation: text(
      'This monumental sandstone gateway stands at Pariser Platz and is one of Berlin’s best-known historical landmarks.',
      '这座宏伟的砂岩门楼矗立在巴黎广场，是柏林最著名的历史地标之一。',
    ),
  },
]

const questionsById = new Map(questions.map((question) => [question.id, question]))

export function getQuestion(id: string): Question | undefined {
  return questionsById.get(id)
}
