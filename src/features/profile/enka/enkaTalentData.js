/**
 * Таблица по skillDepotId для персонажей Genshin Impact: порядок skillId
 * внутри skillLevelMap (Enka отдаёт их БЕЗ привязки к атака/навык/взрыв —
 * см. комментарий в enkaExtract.js) + иконки всех 6 созвездий.
 *
 * ВЕРИФИЦИРОВАННЫЙ источник (тот же репозиторий, на который уже
 * ссылается enkaMappings.js): EnkaNetwork/API-docs, файл
 * store/gi/avatars.json — официальный датасет проекта Enka.Network.
 * Ключ = avatarId (совпадает с нашим enkaId).
 *   - "SkillOrder" = [id обычной атаки, id элем. навыка, id элем. взрыва].
 *     Порядок проверен по префиксам вложенных иконок в поле "Skills":
 *     Skill_A_* (Attack) / Skill_S_* (Skill) / Skill_E_* (Elemental Burst) —
 *     сверено вручную на нескольких персонажах с разными кит-паттернами
 *     (Klee, Zhongli, Bennett, RaidenShogun, Tartaglia, Nahida).
 *   - "Consts" = 6 иконок созвездий C1..C6 по порядку.
 *
 * Иконки — bare-имя (без "/ui/" и ".png"), как и icon у оружия/артефактов
 * в enkaExtract.js, используются так же: `https://enka.network/ui/${iconName}.png`.
 *
 * Базовые формы Путешественника (avatarId 10000005/10000007, элементные
 * скилл-депо идут отдельными ключами вида "10000005-501") исключены —
 * Enka отдаёт по ним пустые "None"-иконки созвездий, да и в проекте пока
 * нет ни одной enkaId-записи для Тревелера.
 *
 * Включены ВСЕ обычные персонажи, известные Enka на момент выгрузки (не
 * только те, у кого в data/characters уже проставлен enkaId) — чтобы
 * при добавлении нового enkaId эта таблица не требовала обновления.
 */
const ENKA_TALENT_DATA = {
    10000002: { skillOrder: [10024, 10018, 10019], constIcons: ['UI_Talent_S_Ayaka_01', 'UI_Talent_S_Ayaka_02', 'UI_Talent_U_Ayaka_02', 'UI_Talent_S_Ayaka_03', 'UI_Talent_U_Ayaka_01', 'UI_Talent_S_Ayaka_04'] },
    10000003: { skillOrder: [10031, 10033, 10034], constIcons: ['UI_Talent_S_Qin_01', 'UI_Talent_S_Qin_02', 'UI_Talent_U_Qin_02', 'UI_Talent_S_Qin_03', 'UI_Talent_U_Qin_01', 'UI_Talent_S_Qin_04'] },
    10000006: { skillOrder: [10060, 10061, 10062], constIcons: ['UI_Talent_S_Lisa_01', 'UI_Talent_S_Lisa_02', 'UI_Talent_U_Lisa_02', 'UI_Talent_S_Lisa_03', 'UI_Talent_U_Lisa_01', 'UI_Talent_S_Lisa_04'] },
    10000014: { skillOrder: [10070, 10071, 10072], constIcons: ['UI_Talent_S_Barbara_01', 'UI_Talent_S_Barbara_02', 'UI_Talent_U_Barbara_02', 'UI_Talent_S_Barbara_03', 'UI_Talent_U_Barbara_01', 'UI_Talent_S_Barbara_04'] },
    10000015: { skillOrder: [10073, 10074, 10075], constIcons: ['UI_Talent_S_Kaeya_01', 'UI_Talent_S_Kaeya_02', 'UI_Talent_U_Kaeya_01', 'UI_Talent_S_Kaeya_03', 'UI_Talent_U_Kaeya_02', 'UI_Talent_S_Kaeya_04'] },
    10000016: { skillOrder: [10160, 10161, 10165], constIcons: ['UI_Talent_S_Diluc_01', 'UI_Talent_S_Diluc_02', 'UI_Talent_U_Diluc_01', 'UI_Talent_S_Diluc_03', 'UI_Talent_U_Diluc_02', 'UI_Talent_S_Diluc_04'] },
    10000020: { skillOrder: [10201, 10202, 10203], constIcons: ['UI_Talent_S_Razor_01', 'UI_Talent_S_Razor_02', 'UI_Talent_U_Razor_02', 'UI_Talent_S_Razor_03', 'UI_Talent_U_Razor_01', 'UI_Talent_S_Razor_04'] },
    10000021: { skillOrder: [10041, 10032, 10017], constIcons: ['UI_Talent_S_Ambor_01', 'UI_Talent_S_Ambor_02', 'UI_Talent_U_Ambor_02', 'UI_Talent_S_Ambor_03', 'UI_Talent_U_Ambor_01', 'UI_Talent_S_Ambor_04'] },
    10000022: { skillOrder: [10221, 10224, 10225], constIcons: ['UI_Talent_S_Venti_01', 'UI_Talent_S_Venti_02', 'UI_Talent_U_Venti_02', 'UI_Talent_S_Venti_03', 'UI_Talent_U_Venti_01', 'UI_Talent_S_Venti_04'] },
    10000023: { skillOrder: [10231, 10232, 10235], constIcons: ['UI_Talent_S_Xiangling_01', 'UI_Talent_S_Xiangling_02', 'UI_Talent_U_Xiangling_02', 'UI_Talent_S_Xiangling_03', 'UI_Talent_U_Xiangling_01', 'UI_Talent_S_Xiangling_04'] },
    10000024: { skillOrder: [10241, 10242, 10245], constIcons: ['UI_Talent_S_Beidou_02', 'UI_Talent_S_Beidou_01', 'UI_Talent_U_Beidou_01', 'UI_Talent_S_Beidou_03', 'UI_Talent_U_Beidou_02', 'UI_Talent_S_Beidou_04'] },
    10000025: { skillOrder: [10381, 10382, 10385], constIcons: ['UI_Talent_S_Xingqiu_01', 'UI_Talent_S_Xingqiu_02', 'UI_Talent_U_Xingqiu_01', 'UI_Talent_S_Xingqiu_03', 'UI_Talent_U_Xingqiu_02', 'UI_Talent_S_Xingqiu_04'] },
    10000026: { skillOrder: [10261, 10262, 10265], constIcons: ['UI_Talent_S_Xiao_01', 'UI_Talent_S_Xiao_02', 'UI_Talent_U_Xiao_01', 'UI_Talent_S_Xiao_03', 'UI_Talent_U_Xiao_02', 'UI_Talent_S_Xiao_04'] },
    10000027: { skillOrder: [10271, 10272, 10274], constIcons: ['UI_Talent_S_Ningguang_01', 'UI_Talent_S_Ningguang_05', 'UI_Talent_U_Ningguang_02', 'UI_Talent_S_Ningguang_03', 'UI_Talent_U_Ningguang_01', 'UI_Talent_S_Ningguang_04'] },
    10000029: { skillOrder: [10291, 10292, 10295], constIcons: ['UI_Talent_S_Klee_01', 'UI_Talent_S_Klee_02', 'UI_Talent_U_Klee_01', 'UI_Talent_S_Klee_03', 'UI_Talent_U_Klee_02', 'UI_Talent_S_Klee_04'] },
    10000030: { skillOrder: [10301, 10302, 10303], constIcons: ['UI_Talent_S_Zhongli_01', 'UI_Talent_S_Zhongli_02', 'UI_Talent_U_Zhongli_01', 'UI_Talent_S_Zhongli_03', 'UI_Talent_U_Zhongli_02', 'UI_Talent_S_Zhongli_04'] },
    10000031: { skillOrder: [10311, 10312, 10313], constIcons: ['UI_Talent_S_Fischl_01', 'UI_Talent_S_Fischl_02', 'UI_Talent_U_Fischl_01', 'UI_Talent_S_Fischl_03', 'UI_Talent_U_Fischl_02', 'UI_Talent_S_Fischl_04'] },
    10000032: { skillOrder: [10321, 10322, 10323], constIcons: ['UI_Talent_S_Bennett_01', 'UI_Talent_S_Bennett_02', 'UI_Talent_U_Bennett_01', 'UI_Talent_S_Bennett_03', 'UI_Talent_U_Bennett_02', 'UI_Talent_S_Bennett_04'] },
    10000033: { skillOrder: [10331, 10332, 10333], constIcons: ['UI_Talent_S_Tartaglia_01', 'UI_Talent_S_Tartaglia_02', 'UI_Talent_U_Tartaglia_01', 'UI_Talent_S_Tartaglia_05', 'UI_Talent_U_Tartaglia_02', 'UI_Talent_S_Tartaglia_04'] },
    10000034: { skillOrder: [10341, 10342, 10343], constIcons: ['UI_Talent_S_Noel_01', 'UI_Talent_S_Noel_02', 'UI_Talent_U_Noel_01', 'UI_Talent_S_Noel_03', 'UI_Talent_U_Noel_02', 'UI_Talent_S_Noel_04'] },
    10000035: { skillOrder: [10351, 10352, 10353], constIcons: ['UI_Talent_S_Qiqi_01', 'UI_Talent_S_Qiqi_02', 'UI_Talent_U_Qiqi_01', 'UI_Talent_S_Qiqi_03', 'UI_Talent_U_Qiqi_02', 'UI_Talent_S_Qiqi_04'] },
    10000036: { skillOrder: [10401, 10402, 10403], constIcons: ['UI_Talent_S_Chongyun_01', 'UI_Talent_S_Chongyun_02', 'UI_Talent_U_Chongyun_01', 'UI_Talent_S_Chongyun_03', 'UI_Talent_U_Chongyun_02', 'UI_Talent_S_Chongyun_04'] },
    10000037: { skillOrder: [10371, 10372, 10373], constIcons: ['UI_Talent_S_Ganyu_01', 'UI_Talent_S_Ganyu_02', 'UI_Talent_U_Ganyu_01', 'UI_Talent_S_Ganyu_03', 'UI_Talent_U_Ganyu_02', 'UI_Talent_S_Ganyu_04'] },
    10000038: { skillOrder: [10386, 10387, 10388], constIcons: ['UI_Talent_S_Albedo_01', 'UI_Talent_S_Albedo_02', 'UI_Talent_U_Albedo_01', 'UI_Talent_S_Albedo_03', 'UI_Talent_U_Albedo_02', 'UI_Talent_S_Albedo_04'] },
    10000039: { skillOrder: [10391, 10392, 10395], constIcons: ['UI_Talent_S_Diona_01', 'UI_Talent_S_Diona_02', 'UI_Talent_U_Diona_01', 'UI_Talent_S_Diona_03', 'UI_Talent_U_Diona_02', 'UI_Talent_S_Diona_04'] },
    10000041: { skillOrder: [10411, 10412, 10415], constIcons: ['UI_Talent_S_Mona_01', 'UI_Talent_S_Mona_02', 'UI_Talent_U_Mona_01', 'UI_Talent_S_Mona_03', 'UI_Talent_U_Mona_02', 'UI_Talent_S_Mona_04'] },
    10000042: { skillOrder: [10421, 10422, 10425], constIcons: ['UI_Talent_S_Keqing_01', 'UI_Talent_S_Keqing_02', 'UI_Talent_U_Keqing_01', 'UI_Talent_S_Keqing_03', 'UI_Talent_U_Keqing_02', 'UI_Talent_S_Keqing_04'] },
    10000043: { skillOrder: [10431, 10432, 10435], constIcons: ['UI_Talent_S_Sucrose_01', 'UI_Talent_S_Sucrose_02', 'UI_Talent_U_Sucrose_01', 'UI_Talent_S_Sucrose_03', 'UI_Talent_U_Sucrose_02', 'UI_Talent_S_Sucrose_04'] },
    10000044: { skillOrder: [10441, 10442, 10443], constIcons: ['UI_Talent_S_Xinyan_01', 'UI_Talent_S_Xinyan_02', 'UI_Talent_U_Xinyan_01', 'UI_Talent_S_Xinyan_03', 'UI_Talent_U_Xinyan_02', 'UI_Talent_S_Xinyan_04'] },
    10000045: { skillOrder: [10451, 10452, 10453], constIcons: ['UI_Talent_S_Rosaria_01', 'UI_Talent_S_Rosaria_02', 'UI_Talent_U_Rosaria_01', 'UI_Talent_S_Rosaria_03', 'UI_Talent_U_Rosaria_02', 'UI_Talent_S_Rosaria_04'] },
    10000046: { skillOrder: [10461, 10462, 10463], constIcons: ['UI_Talent_S_Hutao_03', 'UI_Talent_S_Hutao_01', 'UI_Talent_U_Hutao_01', 'UI_Talent_S_Hutao_02', 'UI_Talent_U_Hutao_02', 'UI_Talent_S_Hutao_04'] },
    10000047: { skillOrder: [10471, 10472, 10475], constIcons: ['UI_Talent_S_Kazuha_01', 'UI_Talent_S_Kazuha_02', 'UI_Talent_U_Kazuha_01', 'UI_Talent_S_Kazuha_03', 'UI_Talent_U_Kazuha_02', 'UI_Talent_S_Kazuha_04'] },
    10000048: { skillOrder: [10481, 10482, 10485], constIcons: ['UI_Talent_S_Feiyan_01', 'UI_Talent_S_Feiyan_02', 'UI_Talent_U_Feiyan_01', 'UI_Talent_S_Feiyan_03', 'UI_Talent_U_Feiyan_02', 'UI_Talent_S_Feiyan_04'] },
    10000049: { skillOrder: [10491, 10492, 10495], constIcons: ['UI_Talent_S_Yoimiya_01', 'UI_Talent_S_Yoimiya_02', 'UI_Talent_U_Yoimiya_01', 'UI_Talent_S_Yoimiya_03', 'UI_Talent_U_Yoimiya_02', 'UI_Talent_S_Yoimiya_04'] },
    10000050: { skillOrder: [10501, 10502, 10505], constIcons: ['UI_Talent_S_Tohma_01', 'UI_Talent_S_Tohma_02', 'UI_Talent_U_Tohma_01', 'UI_Talent_S_Tohma_03', 'UI_Talent_U_Tohma_02', 'UI_Talent_S_Tohma_04'] },
    10000051: { skillOrder: [10511, 10512, 10515], constIcons: ['UI_Talent_S_Eula_02', 'UI_Talent_S_Eula_01', 'UI_Talent_U_Eula_01', 'UI_Talent_S_Eula_03', 'UI_Talent_U_Eula_02', 'UI_Talent_S_Eula_04'] },
    10000052: { skillOrder: [10521, 10522, 10525], constIcons: ['UI_Talent_S_Shougun_01', 'UI_Talent_S_Shougun_03', 'UI_Talent_U_Shougun_02', 'UI_Talent_S_Shougun_02', 'UI_Talent_U_Shougun_01', 'UI_Talent_S_Shougun_04'] },
    10000053: { skillOrder: [10531, 10532, 10535], constIcons: ['UI_Talent_S_Sayu_01', 'UI_Talent_S_Sayu_02', 'UI_Talent_U_Sayu_02', 'UI_Talent_S_Sayu_03', 'UI_Talent_U_Sayu_01', 'UI_Talent_S_Sayu_04'] },
    10000054: { skillOrder: [10541, 10542, 10545], constIcons: ['UI_Talent_S_Kokomi_01', 'UI_Talent_S_Kokomi_02', 'UI_Talent_U_Kokomi_02', 'UI_Talent_S_Kokomi_03', 'UI_Talent_U_Kokomi_01', 'UI_Talent_S_Kokomi_04'] },
    10000055: { skillOrder: [10551, 10552, 10555], constIcons: ['UI_Talent_S_Gorou_01', 'UI_Talent_S_Gorou_02', 'UI_Talent_U_Gorou_01', 'UI_Talent_S_Gorou_03', 'UI_Talent_U_Gorou_02', 'UI_Talent_S_Gorou_04'] },
    10000056: { skillOrder: [10561, 10562, 10565], constIcons: ['UI_Talent_S_Sara_05', 'UI_Talent_S_Sara_02', 'UI_Talent_U_Sara_02', 'UI_Talent_S_Sara_03', 'UI_Talent_U_Sara_01', 'UI_Talent_S_Sara_04'] },
    10000057: { skillOrder: [10571, 10572, 10575], constIcons: ['UI_Talent_S_Itto_01', 'UI_Talent_S_Itto_02', 'UI_Talent_U_Itto_01', 'UI_Talent_S_Itto_03', 'UI_Talent_U_Itto_02', 'UI_Talent_S_Itto_04'] },
    10000058: { skillOrder: [10581, 10582, 10585], constIcons: ['UI_Talent_S_Yae_01', 'UI_Talent_S_Yae_02', 'UI_Talent_U_Yae_01', 'UI_Talent_S_Yae_03', 'UI_Talent_U_Yae_02', 'UI_Talent_S_Yae_04'] },
    10000059: { skillOrder: [10591, 10592, 10595], constIcons: ['UI_Talent_S_Heizo_01', 'UI_Talent_S_Heizo_02', 'UI_Talent_U_Heizo_01', 'UI_Talent_S_Heizo_03', 'UI_Talent_U_Heizo_02', 'UI_Talent_S_Heizo_04'] },
    10000060: { skillOrder: [10606, 10607, 10610], constIcons: ['UI_Talent_S_Yelan_01', 'UI_Talent_S_Yelan_02', 'UI_Talent_U_Yelan_01', 'UI_Talent_S_Yelan_03', 'UI_Talent_U_Yelan_02', 'UI_Talent_S_Yelan_04'] },
    10000061: { skillOrder: [10611, 10612, 10615], constIcons: ['UI_Talent_S_Momoka_01', 'UI_Talent_S_Momoka_02', 'UI_Talent_U_Momoka_01', 'UI_Talent_S_Momoka_04', 'UI_Talent_U_Momoka_02', 'UI_Talent_S_Momoka_03'] },
    10000062: { skillOrder: [10621, 10622, 10625], constIcons: ['UI_Talent_S_Aloy_Lock', 'UI_Talent_S_Aloy_Lock', 'UI_Talent_S_Aloy_Lock', 'UI_Talent_S_Aloy_Lock', 'UI_Talent_S_Aloy_Lock', 'UI_Talent_S_Aloy_Lock'] },
    10000063: { skillOrder: [10631, 10632, 10635], constIcons: ['UI_Talent_S_Shenhe_02', 'UI_Talent_S_Shenhe_01', 'UI_Talent_U_Shenhe_01', 'UI_Talent_S_Shenhe_03', 'UI_Talent_U_Shenhe_02', 'UI_Talent_S_Shenhe_04'] },
    10000064: { skillOrder: [10641, 10642, 10643], constIcons: ['UI_Talent_S_Yunjin_01', 'UI_Talent_S_Yunjin_02', 'UI_Talent_U_Yunjin_01', 'UI_Talent_S_Yunjin_03', 'UI_Talent_U_Yunjin_02', 'UI_Talent_S_Yunjin_04'] },
    10000065: { skillOrder: [10651, 10652, 10655], constIcons: ['UI_Talent_S_Shinobu_01', 'UI_Talent_S_Shinobu_02', 'UI_Talent_U_Shinobu_01', 'UI_Talent_S_Shinobu_03', 'UI_Talent_U_Shinobu_02', 'UI_Talent_S_Shinobu_04'] },
    10000066: { skillOrder: [10661, 10662, 10665], constIcons: ['UI_Talent_S_Ayato_01', 'UI_Talent_S_Ayato_02', 'UI_Talent_U_Ayato_02', 'UI_Talent_S_Ayato_03', 'UI_Talent_U_Ayato_01', 'UI_Talent_S_Ayato_04'] },
    10000067: { skillOrder: [10671, 10672, 10675], constIcons: ['UI_Talent_S_Collei_01', 'UI_Talent_S_Collei_02', 'UI_Talent_U_Collei_02', 'UI_Talent_S_Collei_03', 'UI_Talent_U_Collei_01', 'UI_Talent_S_Collei_04'] },
    10000068: { skillOrder: [10681, 10682, 10685], constIcons: ['UI_Talent_S_Dori_01', 'UI_Talent_S_Dori_02', 'UI_Talent_U_Dori_02', 'UI_Talent_S_Dori_03', 'UI_Talent_U_Dori_01', 'UI_Talent_S_Dori_04'] },
    10000069: { skillOrder: [10691, 10692, 10695], constIcons: ['UI_Talent_S_Tighnari_01', 'UI_Talent_S_Tighnari_02', 'UI_Talent_U_Tighnari_01', 'UI_Talent_S_Tighnari_03', 'UI_Talent_U_Tighnari_02', 'UI_Talent_S_Tighnari_04'] },
    10000070: { skillOrder: [10701, 10702, 10705], constIcons: ['UI_Talent_S_Nilou_01', 'UI_Talent_S_Nilou_02', 'UI_Talent_U_Nilou_01', 'UI_Talent_S_Nilou_03', 'UI_Talent_U_Nilou_02', 'UI_Talent_S_Nilou_04'] },
    10000071: { skillOrder: [10711, 10712, 10715], constIcons: ['UI_Talent_S_Cyno_01', 'UI_Talent_S_Cyno_02', 'UI_Talent_U_Cyno_01', 'UI_Talent_S_Cyno_03', 'UI_Talent_U_Cyno_02', 'UI_Talent_S_Cyno_04'] },
    10000072: { skillOrder: [10721, 10722, 10725], constIcons: ['UI_Talent_S_Candace_01', 'UI_Talent_S_Candace_02', 'UI_Talent_U_Candace_01', 'UI_Talent_S_Candace_03', 'UI_Talent_U_Candace_02', 'UI_Talent_S_Candace_04'] },
    10000073: { skillOrder: [10731, 10732, 10735], constIcons: ['UI_Talent_S_Nahida_01', 'UI_Talent_S_Nahida_02', 'UI_Talent_U_Nahida_01', 'UI_Talent_S_Nahida_03', 'UI_Talent_U_Nahida_02', 'UI_Talent_S_Nahida_04'] },
    10000074: { skillOrder: [10741, 10742, 10745], constIcons: ['UI_Talent_S_Layla_01', 'UI_Talent_S_Layla_02', 'UI_Talent_U_Layla_01', 'UI_Talent_S_Layla_03', 'UI_Talent_U_Layla_02', 'UI_Talent_S_Layla_04'] },
    10000075: { skillOrder: [10751, 10752, 10755], constIcons: ['UI_Talent_S_Wanderer_01', 'UI_Talent_S_Wanderer_02', 'UI_Talent_U_Wanderer_02', 'UI_Talent_S_Wanderer_03', 'UI_Talent_U_Wanderer_01', 'UI_Talent_S_Wanderer_04'] },
    10000076: { skillOrder: [10761, 10762, 10765], constIcons: ['UI_Talent_S_Faruzan_01', 'UI_Talent_S_Faruzan_02', 'UI_Talent_U_Faruzan_01', 'UI_Talent_S_Faruzan_03', 'UI_Talent_U_Faruzan_02', 'UI_Talent_S_Faruzan_04'] },
    10000077: { skillOrder: [10771, 10772, 10775], constIcons: ['UI_Talent_S_Yaoyao_01', 'UI_Talent_S_Yaoyao_02', 'UI_Talent_U_Yaoyao_01', 'UI_Talent_S_Yaoyao_03', 'UI_Talent_U_Yaoyao_02', 'UI_Talent_S_Yaoyao_04'] },
    10000078: { skillOrder: [10781, 10782, 10785], constIcons: ['UI_Talent_S_Alhatham_02', 'UI_Talent_S_Alhatham_01', 'UI_Talent_U_Alhatham_01', 'UI_Talent_S_Alhatham_03', 'UI_Talent_U_Alhatham_02', 'UI_Talent_S_Alhatham_04'] },
    10000079: { skillOrder: [10791, 10792, 10795], constIcons: ['UI_Talent_S_Dehya_01', 'UI_Talent_S_Dehya_02', 'UI_Talent_U_Dehya_01', 'UI_Talent_S_Dehya_03', 'UI_Talent_U_Dehya_02', 'UI_Talent_S_Dehya_04'] },
    10000080: { skillOrder: [10801, 10802, 10805], constIcons: ['UI_Talent_S_Mika_01', 'UI_Talent_S_Mika_02', 'UI_Talent_U_Mika_01', 'UI_Talent_S_Mika_03', 'UI_Talent_U_Mika_02', 'UI_Talent_S_Mika_04'] },
    10000081: { skillOrder: [10811, 10812, 10815], constIcons: ['UI_Talent_S_Kaveh_01', 'UI_Talent_S_Kaveh_02', 'UI_Talent_U_Kaveh_02', 'UI_Talent_S_Kaveh_03', 'UI_Talent_U_Kaveh_01', 'UI_Talent_S_Kaveh_04'] },
    10000082: { skillOrder: [10821, 10822, 10825], constIcons: ['UI_Talent_S_Baizhuer_01', 'UI_Talent_S_Baizhuer_02', 'UI_Talent_U_Baizhuer_01', 'UI_Talent_S_Baizhuer_03', 'UI_Talent_U_Baizhuer_02', 'UI_Talent_S_Baizhuer_04'] },
    10000083: { skillOrder: [10831, 10832, 10835], constIcons: ['UI_Talent_S_Linette_01', 'UI_Talent_S_Linette_02', 'UI_Talent_U_Linette_01', 'UI_Talent_S_Linette_03', 'UI_Talent_U_Linette_02', 'UI_Talent_S_Linette_04'] },
    10000084: { skillOrder: [10841, 10842, 10845], constIcons: ['UI_Talent_S_Liney_01', 'UI_Talent_S_Liney_03', 'UI_Talent_U_Liney_01', 'UI_Talent_S_Liney_02', 'UI_Talent_U_Liney_02', 'UI_Talent_S_Liney_04'] },
    10000085: { skillOrder: [10851, 10852, 10855], constIcons: ['UI_Talent_S_Freminet_01', 'UI_Talent_S_Freminet_02', 'UI_Talent_U_Freminet_01', 'UI_Talent_S_Freminet_03', 'UI_Talent_U_Freminet_02', 'UI_Talent_S_Freminet_04'] },
    10000086: { skillOrder: [10861, 10862, 10865], constIcons: ['UI_Talent_S_Wriothesley_01', 'UI_Talent_S_Wriothesley_02', 'UI_Talent_U_Wriothesley_01', 'UI_Talent_S_Wriothesley_03', 'UI_Talent_U_Wriothesley_02', 'UI_Talent_S_Wriothesley_04'] },
    10000087: { skillOrder: [10871, 10872, 10875], constIcons: ['UI_Talent_S_Neuvillette_01', 'UI_Talent_S_Neuvillette_02', 'UI_Talent_U_Neuvillette_01', 'UI_Talent_S_Neuvillette_03', 'UI_Talent_U_Neuvillette_02', 'UI_Talent_S_Neuvillette_04'] },
    10000088: { skillOrder: [10881, 10882, 10885], constIcons: ['UI_Talent_S_Charlotte_01', 'UI_Talent_S_Charlotte_02', 'UI_Talent_U_Charlotte_01', 'UI_Talent_S_Charlotte_03', 'UI_Talent_U_Charlotte_02', 'UI_Talent_S_Charlotte_04'] },
    10000089: { skillOrder: [10891, 10892, 10895], constIcons: ['UI_Talent_S_Furina_01', 'UI_Talent_S_Furina_04', 'UI_Talent_U_Furina_02', 'UI_Talent_S_Furina_03', 'UI_Talent_U_Furina_01', 'UI_Talent_S_Furina_02'] },
    10000090: { skillOrder: [10901, 10902, 10905], constIcons: ['UI_Talent_S_Chevreuse_01', 'UI_Talent_S_Chevreuse_02', 'UI_Talent_U_Chevreuse_01', 'UI_Talent_S_Chevreuse_03', 'UI_Talent_U_Chevreuse_02', 'UI_Talent_S_Chevreuse_04'] },
    10000091: { skillOrder: [10911, 10912, 10915], constIcons: ['UI_Talent_S_Navia_01', 'UI_Talent_S_Navia_02', 'UI_Talent_U_Navia_01', 'UI_Talent_S_Navia_03', 'UI_Talent_U_Navia_02', 'UI_Talent_S_Navia_04'] },
    10000092: { skillOrder: [10921, 10922, 10925], constIcons: ['UI_Talent_S_Gaming_01', 'UI_Talent_S_Gaming_02', 'UI_Talent_U_Gaming_01', 'UI_Talent_S_Gaming_03', 'UI_Talent_U_Gaming_02', 'UI_Talent_S_Gaming_04'] },
    10000093: { skillOrder: [10931, 10932, 10935], constIcons: ['UI_Talent_S_Liuyun_01', 'UI_Talent_S_Liuyun_02', 'UI_Talent_U_Liuyun_02', 'UI_Talent_S_Liuyun_03', 'UI_Talent_U_Liuyun_01', 'UI_Talent_S_Liuyun_04'] },
    10000094: { skillOrder: [10941, 10942, 10945], constIcons: ['UI_Talent_S_Chiori_01', 'UI_Talent_S_Chiori_03', 'UI_Talent_U_Chiori_01', 'UI_Talent_S_Chiori_02', 'UI_Talent_U_Chiori_02', 'UI_Talent_S_Chiori_04'] },
    10000095: { skillOrder: [10951, 10952, 10955], constIcons: ['UI_Talent_S_Sigewinne_01', 'UI_Talent_S_Sigewinne_02', 'UI_Talent_U_Sigewinne_01', 'UI_Talent_S_Sigewinne_03', 'UI_Talent_U_Sigewinne_02', 'UI_Talent_S_Sigewinne_04'] },
    10000096: { skillOrder: [10961, 10962, 10965], constIcons: ['UI_Talent_S_Arlecchino_01', 'UI_Talent_S_Arlecchino_02', 'UI_Talent_U_Arlecchino_01', 'UI_Talent_S_Arlecchino_03', 'UI_Talent_U_Arlecchino_02', 'UI_Talent_S_Arlecchino_04'] },
    10000097: { skillOrder: [10971, 10972, 10975], constIcons: ['UI_Talent_S_Sethos_01', 'UI_Talent_S_Sethos_02', 'UI_Talent_U_Sethos_01', 'UI_Talent_S_Sethos_03', 'UI_Talent_U_Sethos_02', 'UI_Talent_S_Sethos_04'] },
    10000098: { skillOrder: [10981, 10982, 10985], constIcons: ['UI_Talent_S_Clorinde_01', 'UI_Talent_S_Clorinde_02', 'UI_Talent_U_Clorinde_02', 'UI_Talent_S_Clorinde_03', 'UI_Talent_U_Clorinde_01', 'UI_Talent_S_Clorinde_04'] },
    10000099: { skillOrder: [10991, 10992, 10995], constIcons: ['UI_Talent_S_Emilie_01', 'UI_Talent_S_Emilie_02', 'UI_Talent_U_Emilie_01', 'UI_Talent_S_Emilie_03', 'UI_Talent_U_Emilie_02', 'UI_Talent_S_Emilie_04'] },
    10000100: { skillOrder: [11001, 11002, 11005], constIcons: ['UI_Talent_S_Kachina_01', 'UI_Talent_S_Kachina_02', 'UI_Talent_U_Kachina_01', 'UI_Talent_S_Kachina_03', 'UI_Talent_U_Kachina_02', 'UI_Talent_S_Kachina_04'] },
    10000101: { skillOrder: [11011, 11012, 11015], constIcons: ['UI_Talent_S_Kinich_01', 'UI_Talent_S_Kinich_02', 'UI_Talent_U_Kinich_01', 'UI_Talent_S_Kinich_03', 'UI_Talent_U_Kinich_02', 'UI_Talent_S_Kinich_04'] },
    10000102: { skillOrder: [30000, 30002, 30007], constIcons: ['UI_Talent_S_Mualani_01', 'UI_Talent_S_Mualani_02', 'UI_Talent_U_Mualani_01', 'UI_Talent_S_Mualani_03', 'UI_Talent_U_Mualani_02', 'UI_Talent_S_Mualani_04'] },
    10000103: { skillOrder: [11031, 11032, 11035], constIcons: ['UI_Talent_S_Xilonen_01', 'UI_Talent_S_Xilonen_02', 'UI_Talent_U_Xilonen_01', 'UI_Talent_S_Xilonen_03', 'UI_Talent_U_Xilonen_02', 'UI_Talent_S_Xilonen_04'] },
    10000104: { skillOrder: [11041, 11042, 11045], constIcons: ['UI_Talent_S_Chasca_01', 'UI_Talent_S_Chasca_02', 'UI_Talent_U_Chasca_01', 'UI_Talent_S_Chasca_03', 'UI_Talent_U_Chasca_02', 'UI_Talent_S_Chasca_04'] },
    10000105: { skillOrder: [30501, 30502, 30505], constIcons: ['UI_Talent_S_Olorun_01', 'UI_Talent_S_Olorun_02', 'UI_Talent_U_Olorun_01', 'UI_Talent_S_Olorun_03', 'UI_Talent_U_Olorun_02', 'UI_Talent_S_Olorun_04'] },
    10000106: { skillOrder: [11061, 11062, 11065], constIcons: ['UI_Talent_S_Mavuika_01', 'UI_Talent_S_Mavuika_02', 'UI_Talent_U_Mavuika_01', 'UI_Talent_S_Mavuika_03', 'UI_Talent_U_Mavuika_02', 'UI_Talent_S_Mavuika_04'] },
    10000107: { skillOrder: [11071, 11072, 11075], constIcons: ['UI_Talent_S_Citlali_01', 'UI_Talent_S_Citlali_02', 'UI_Talent_U_Citlali_01', 'UI_Talent_S_Citlali_03', 'UI_Talent_U_Citlali_02', 'UI_Talent_S_Citlali_04'] },
    10000108: { skillOrder: [11081, 11082, 11085], constIcons: ['UI_Talent_S_Lanyan_01', 'UI_Talent_S_Lanyan_02', 'UI_Talent_U_Lanyan_01', 'UI_Talent_S_Lanyan_03', 'UI_Talent_U_Lanyan_02', 'UI_Talent_S_Lanyan_04'] },
    10000109: { skillOrder: [11091, 11092, 11095], constIcons: ['UI_Talent_S_Mizuki_01', 'UI_Talent_S_Mizuki_02', 'UI_Talent_U_Mizuki_01', 'UI_Talent_S_Mizuki_03', 'UI_Talent_U_Mizuki_02', 'UI_Talent_S_Mizuki_04'] },
    10000110: { skillOrder: [11101, 11102, 11105], constIcons: ['UI_Talent_S_Iansan_01', 'UI_Talent_S_Iansan_02', 'UI_Talent_U_Iansan_01', 'UI_Talent_S_Iansan_03', 'UI_Talent_U_Iansan_02', 'UI_Talent_S_Iansan_04'] },
    10000111: { skillOrder: [11111, 11112, 11115], constIcons: ['UI_Talent_S_Varesa_01', 'UI_Talent_S_Varesa_02', 'UI_Talent_U_Varesa_01', 'UI_Talent_S_Varesa_03', 'UI_Talent_U_Varesa_02', 'UI_Talent_S_Varesa_04'] },
    10000112: { skillOrder: [11121, 11122, 11125], constIcons: ['UI_Talent_S_Escoffier_01', 'UI_Talent_S_Escoffier_02', 'UI_Talent_U_Escoffier_01', 'UI_Talent_S_Escoffier_03', 'UI_Talent_U_Escoffier_02', 'UI_Talent_S_Escoffier_04'] },
    10000113: { skillOrder: [11131, 11132, 11135], constIcons: ['UI_Talent_S_Ifa_01', 'UI_Talent_S_Ifa_02', 'UI_Talent_U_Ifa_01', 'UI_Talent_S_Ifa_03', 'UI_Talent_U_Ifa_02', 'UI_Talent_S_Ifa_04'] },
    10000114: { skillOrder: [11141, 11142, 11145], constIcons: ['UI_Talent_S_SkirkNew_01', 'UI_Talent_S_SkirkNew_02', 'UI_Talent_U_SkirkNew_01', 'UI_Talent_S_SkirkNew_03', 'UI_Talent_U_SkirkNew_02', 'UI_Talent_S_SkirkNew_04'] },
    10000115: { skillOrder: [11151, 11152, 11155], constIcons: ['UI_Talent_S_Dahlia_01', 'UI_Talent_S_Dahlia_02', 'UI_Talent_U_Dahlia_01', 'UI_Talent_S_Dahlia_03', 'UI_Talent_U_Dahlia_02', 'UI_Talent_S_Dahlia_04'] },
    10000116: { skillOrder: [11161, 11162, 11165], constIcons: ['UI_Talent_S_Ineffa_01', 'UI_Talent_S_Ineffa_02', 'UI_Talent_U_Ineffa_01', 'UI_Talent_S_Ineffa_03', 'UI_Talent_U_Ineffa_02', 'UI_Talent_S_Ineffa_04'] },
    10000119: { skillOrder: [11191, 11192, 11195], constIcons: ['UI_Talent_S_Lauma_01', 'UI_Talent_S_Lauma_02', 'UI_Talent_U_Lauma_01', 'UI_Talent_S_Lauma_03', 'UI_Talent_U_Lauma_02', 'UI_Talent_S_Lauma_04'] },
    10000120: { skillOrder: [11201, 11202, 11205], constIcons: ['UI_Talent_S_Flins_01', 'UI_Talent_S_Flins_02', 'UI_Talent_U_Flins_02', 'UI_Talent_S_Flins_03', 'UI_Talent_U_Flins_01', 'UI_Talent_S_Flins_04'] },
    10000121: { skillOrder: [11211, 11212, 11215], constIcons: ['UI_Talent_S_Aino_03', 'UI_Talent_S_Aino_02', 'UI_Talent_U_Aino_01', 'UI_Talent_S_Aino_01', 'UI_Talent_U_Aino_02', 'UI_Talent_S_Aino_04'] },
    10000122: { skillOrder: [11221, 11222, 11225], constIcons: ['UI_Talent_S_Nefer_01', 'UI_Talent_S_Nefer_02', 'UI_Talent_U_Nefer_01', 'UI_Talent_S_Nefer_03', 'UI_Talent_U_Nefer_02', 'UI_Talent_S_Nefer_04'] },
    10000123: { skillOrder: [11231, 11232, 11235], constIcons: ['UI_Talent_S_Durin_03', 'UI_Talent_S_Durin_04', 'UI_Talent_U_Durin_01', 'UI_Talent_S_Durin_05', 'UI_Talent_U_Durin_02', 'UI_Talent_S_Durin_06'] },
    10000124: { skillOrder: [11241, 11242, 11245], constIcons: ['UI_Talent_S_Jahoda_03', 'UI_Talent_S_Jahoda_02', 'UI_Talent_U_Jahoda_01', 'UI_Talent_S_Jahoda_01', 'UI_Talent_U_Jahoda_02', 'UI_Talent_S_Jahoda_04'] },
    10000125: { skillOrder: [11251, 11252, 11255], constIcons: ['UI_Talent_S_Columbina_01', 'UI_Talent_S_Columbina_02', 'UI_Talent_U_Columbina_01', 'UI_Talent_S_Columbina_03', 'UI_Talent_U_Columbina_02', 'UI_Talent_S_Columbina_04'] },
    10000126: { skillOrder: [11261, 11262, 11265], constIcons: ['UI_Talent_S_Zibai_01', 'UI_Talent_S_Zibai_02', 'UI_Talent_U_Zibai_01', 'UI_Talent_S_Zibai_03', 'UI_Talent_U_Zibai_02', 'UI_Talent_S_Zibai_04'] },
    10000127: { skillOrder: [11271, 11272, 11275], constIcons: ['UI_Talent_S_Illuga_01', 'UI_Talent_S_Illuga_02', 'UI_Talent_U_Illuga_01', 'UI_Talent_S_Illuga_03', 'UI_Talent_U_Illuga_02', 'UI_Talent_S_Illuga_04'] },
    10000128: { skillOrder: [11281, 11282, 11285], constIcons: ['UI_Talent_S_Varka_01', 'UI_Talent_S_Varka_02', 'UI_Talent_U_Varka_01', 'UI_Talent_S_Varka_03', 'UI_Talent_U_Varka_02', 'UI_Talent_S_Varka_04'] },
    10000129: { skillOrder: [11291, 11292, 11295], constIcons: ['UI_Talent_S_Lohen_01', 'UI_Talent_S_Lohen_02', 'UI_Talent_U_Lohen_01', 'UI_Talent_S_Lohen_03', 'UI_Talent_U_Lohen_02', 'UI_Talent_S_Lohen_04'] },
    10000130: { skillOrder: [11301, 11302, 11305], constIcons: ['UI_Talent_S_Linnea_01', 'UI_Talent_S_Linnea_02', 'UI_Talent_U_Linnea_01', 'UI_Talent_S_Linnea_03', 'UI_Talent_U_Linnea_02', 'UI_Talent_S_Linnea_04'] },
    10000131: { skillOrder: [11311, 11312, 11315], constIcons: ['UI_Talent_S_Nicole_01', 'UI_Talent_S_Nicole_02', 'UI_Talent_U_Nicole_01', 'UI_Talent_S_Nicole_03', 'UI_Talent_U_Nicole_02', 'UI_Talent_S_Nicole_04'] },
    10000132: { skillOrder: [11321, 11322, 11325], constIcons: ['UI_Talent_S_Prune_01', 'UI_Talent_S_Prune_02', 'UI_Talent_U_Prune_01', 'UI_Talent_S_Prune_03', 'UI_Talent_U_Prune_02', 'UI_Talent_S_Prune_04'] },
    10000133: { skillOrder: [11331, 11332, 11335], constIcons: ['UI_Talent_S_MarionetteNew_01', 'UI_Talent_S_MarionetteNew_02', 'UI_Talent_U_MarionetteNew_01', 'UI_Talent_S_MarionetteNew_03', 'UI_Talent_U_MarionetteNew_02', 'UI_Talent_S_MarionetteNew_04'] },
};

export default ENKA_TALENT_DATA;
