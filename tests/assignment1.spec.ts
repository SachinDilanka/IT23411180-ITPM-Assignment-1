import { test, expect } from '@playwright/test';

/**
 * Helper function:
 * Enters text and returns full page text after conversion
 */
async function convert(page: any, input: string) {
  const textarea = page.locator('textarea');
  await textarea.fill('');
  await textarea.fill(input);
  await page.waitForTimeout(4000);
  return await page.textContent('body');
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

// All test scenarios
const testScenarios = [
    // --- POSITIVE FUNCTIONAL SCENARIOS (24) ---
    { id: 'Pos_Fun_0001', input: 'machan adha bus eka tikak late vage nedha, office ekata yadhdhi parakku veyi', expected: 'මචන් අද bus එක ටිකක් late වගෙ නේද, office එකට යද්දි පරක්කු වෙයි' },
    { id: 'Pos_Fun_0002', input: 'adha vahinavaa kiyala weather app ekee notification ekak aava nisaa, mathak karalaa umbrella eka aragena aavaa.', expected: 'අද වහිනවා කියල weather app එකේ notification එකක් ආව නිසා, මතක් කරලා umbrella එක අරගෙන ආවා.' },
    { id: 'Pos_Fun_0003', input: 'adha udheema magee laptop ekee WiFi vaeda kalee naehae. e nisaa mama office ekata call ekak dhiilaa kivaa mama adha gedhara idhan vaeda karanavaa kiyalaa.', expected: 'අද උදේම මගේ laptop එකේ WiFi වැඩ කලේ නැහැ. එ නිසා මම office එකට call එකක් දීලා කිවා මම අද ගෙදර ඉදන් වැඩ කරනවා කියලා.' },
    { id: 'Pos_Fun_0004', input: 'api iiLaga sathiyee Kandy valata trip ekak yanna plan karanavaa. api udhee 7.30 AM valata train ekee yanna hadhannee scenery eka balanna oona nisaa.', expected: 'අපි ඊළග සතියේ Kandy වලට trip එකක් යන්න plan කරනවා. අපි උදේ 7.30 AM වලට train එකේ යන්න හදන්නේ scenery එක බලන්න ඕන නිසා.' },
    { id: 'Pos_Fun_0005', input: 'mama adha udheema class yanna laeesthi vunath mata poddak nidhimathayi vagee dhaenunaa. e nisaa mama coffee ekak biilaa thamayi eliyata baesse.', expected: 'මම අද උදේම class යන්න ලෑස්ති වුනත් මට පොඩ්ඩක් නිදිමතයි වගේ දැනුනා. එ නිසා මම coffee එකක් බීලා තමයි එලියට බැස්සෙ.' },
    { id: 'Pos_Fun_0006', input: 'nimaali office enna late vennee paare thiyena traffic nisaa kiyalaa message ekak evvaa. mama eyaa enakan kiyavannna oona documents tika print karala laeesthi kalaa.', expected: 'නිමාලි office එන්න late වෙන්නේ පාරෙ තියෙන traffic නිසා කියලා message එකක් එව්වා. මම එයා එනකන් කියවන්න්න ඕන documents ටික print කරල ලෑස්ති කලා.' },
    { id: 'Pos_Fun_0007', input: 'mama adha market ekata gihin elavalu gaththaa. okkoma bill eka Rs.4500 k unaa.', expected: 'මම අද market එකට ගිහින් එලවලු ගත්තා. ඔක්කොම bill එක Rs.4500 ක් උනා.' },
    { id: 'Pos_Fun_0008', input: 'me aluth translator eka harima supiri, eeka hariyata vaeda karanavaa kiyalaa mata hithennee. mama Singlish valin type karadhdhi Real - time output eka pennanavaa.', expected: 'මෙ අලුත් translator එක හරිම සුපිරි, ඒක හරියට වැඩ කරනවා කියලා මට හිතෙන්නේ. මම සින්ග්ලිශ් වලින් type කරද්දි Real - time output එක පෙන්නනවා.' },
    { id: 'Pos_Fun_0009', input: 'samaavenna, mama adha havasa meeting ekata enna hithan hitiyath magee vaahanee podi problem ekak aava. e nisaa mama dhaen garage ekata gihin innee.', expected: 'සමාවෙන්න, මම අද හවස meeting එකට එන්න හිතන් හිටියත් මගේ වාහනේ පොඩි problem එකක් ආව. එ නිසා මම දැන් garage එකට ගිහින් ඉන්නේ.' },
    { id: 'Pos_Fun_0010', input: 'api mee sathi anthayee gedhara party ekak dhaanna hadhannee magee birthday eka nisaa. oyaata invitation eka WhatsApp kalaa.', expected: 'අපි මේ සති අන්තයේ ගෙදර party එකක් දාන්න හදන්නේ මගේ birthday එක නිසා. ඔයාට invitation එක WhatsApp කලා.' },
    { id: 'Pos_Fun_0011', input: 'magee computer ekee RAM eka adu nisaa Visual Studio vaeda karanne godak slow. mama hithannee eeka upgrade karanna kalee hari.', expected: 'මගේ computer එකේ RAM එක අඩු නිසා Visual Studio වැඩ කරන්නේ ගොඩක් slow. මම හිතන්නේ ඒක upgrade කරන්න කලේ හරි.' },
    { id: 'Pos_Fun_0012', input: 'ITPM project ekee documentation tika heta havasa 5.00 PM vedhdhi ivara karanna oona. mama okkoma testing tika automation scripts valin check kalaa.', expected: 'ITPM project එකේ documentation ටික හෙට හවස 5.00 PM වෙද්දි ඉවර කරන්න ඕන. මම ඔක්කොම testing ටික automation scripts වලින් check කලා.' },
    { id: 'Pos_Fun_0013', input: 'hari hari, mama tika tika eeka karannam.', expected: 'හරි හරි, මම ටික ටික ඒක කරන්නම්.' },
    { id: 'Pos_Fun_0014', input: 'mama yanna hadhannee, oyaa enavadha?', expected: 'මම යන්න හදන්නේ, ඔයා එනවද?' },
    { id: 'Pos_Fun_0015', input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?', expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_0016', input: 'meeka hariyata vaeda karanavaadha?', expected: 'මේක හරියට වැඩ කරනවාද?' },
    { id: 'Pos_Fun_0017', input: 'eyaalaa heta enavaa kiyalaa kivaa.', expected: 'එයාලා හෙට එනවා කියලා කිවා.' },
    { id: 'Pos_Fun_0018', input: 'magee lipinaya eyaata WhatsApp karanna.', expected: 'මගේ ලිපිනය එයාට WhatsApp කරන්න.' },
    { id: 'Pos_Fun_0019', input: 'ammee, adha raeeta monavadha uyannee? mama hithan hitiye kaden kaeema tikak aragena enna.', expected: 'අම්මේ, අද රෑට මොනවද උයන්නේ? මම හිතන් හිටියෙ කඩෙන් කෑම ටිකක් අරගෙන එන්න.' },
    { id: 'Pos_Fun_0020', input: 'nimalge birthday eka heta nisaa api eyata podi surprise ekak dhenna oona kiyala hithunaa . oyaata puluvandha heta havasa 6.00 PM vedhdhi apee gedhara enna?', expected: 'නිමල්ගෙ birthday එක හෙට නිසා අපි එයට පොඩි surprise එකක් දෙන්න ඕන කියල හිතුනා . ඔයාට පුලුවන්ද හෙට හවස 6.00 PM වෙද්දි අපේ ගෙදර එන්න?' },
    { id: 'Pos_Fun_0021', input: 'machan, me sathi anthaye api ground ekata gihilla cricket match ekak gahamu kiyala hithan innee . oyaage yaluvoo dhennath ekkan enna puluvandha?', expected: 'මචන්, මෙ සති අන්තයෙ අපි ground එකට ගිහිල්ල cricket match එකක් ගහමු කියල හිතන් ඉන්නේ . ඔයාගෙ යලුවෝ දෙන්නත් එක්කන් එන්න පුලුවන්ද?' },
    { id: 'Pos_Fun_0022', input: 'thaaththe, ammagee beheth tika ivara velaa kiyalaa ammaa kivaa . heta udhenma doctor balanna gihilla checkup ekak karanna.', expected: 'තාත්තෙ, අම්මගේ බෙහෙත් ටික ඉවර වෙලා කියලා අම්මා කිවා . හෙට උදෙන්ම doctor බලන්න ගිහිල්ල checkup එකක් කරන්න.' },
    { id: 'Pos_Fun_0023', input: 'malli, oyaage exam ekata paadam karanna patan ganna.', expected: 'මල්ලි, ඔයාගෙ exam එකට පාඩම් කරන්න පටන් ගන්න.' },
    { id: 'Pos_Fun_0024', input: 'magee yaluvekge wedding eka 2026-05-21 dhina thiyenava kiyala eyage card eka aavaa. api eeka yanna hodha suit ekak saha dress ekak ganna oona.', expected: 'මගේ යලුවෙක්ගෙ wedding එක 2026-05-21 දින තියෙනව කියල එයගෙ card එක ආවා. අපි ඒක යන්න හොද suit එකක් සහ dress එකක් ගන්න ඕන.' },

    // --- NEGATIVE FUNCTIONAL SCENARIOS (10) ---
    { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa', expected: 'මම ගෙදරයනවා' },
    { id: 'Neg_Fun_0002', input: 'mamagedharayanavaahabaeyivahinanisaadhaenmayannee naeeapi eenisaa dhaen kaeema kanna yanavaa', expected: 'මම ගෙදර යනවා හබැයි වහින නිසා දැන්ම යන්නේ නෑඅපි ඒනිසා දැන් කෑම කන්න යනවා' },
    { id: 'Neg_Fun_0003', input: 'MaMa AdHa GeDhArA eDhDhI TiKaK RaA WeI', expected: 'මම අද ගෙදර එද්දි ටිකක් රැ වෙයි.' },
    { id: 'Neg_Fun_0004', input: 'Mee ada hwsa town eka ptte ghin enna ymuda?', expected: 'මේ අද හවස ටවුන් එක පත්තෙ ගිහින් එන්න යමුද?' },
    { id: 'Neg_Fun_0005', input: 'Mama h@riytma 3ta othanata enawa', expected: 'මම හරියටම 3ට ඔතනට එනවා' },
    { id: 'Neg_Fun_0006', input: 'Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', expected: 'එඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඒඑ' },
    { id: 'Neg_Fun_0007', input: 'mama abc123 company eke interview ekata giya adha', expected: 'මම abc123 company එකේ interview එකට ගියා අද' },
    { id: 'Neg_Fun_0008', input: 'karuNaakaralaa meee link eka check karanna:https://www.swifttranslator.com/index.html.', expected: 'කරුණාකරලා මේ link එක check කරන්න:https://www.swifttranslator.com/index.html.' },
    { id: 'Neg_Fun_0009', input: 'mama iPhone saha MacBook use karala office veda tika iwara kalaa.', expected: 'මම iphone සහ Macbook use කරල office වැඩ ටික ඉවර කලා.' },
    { id: 'Neg_Fun_0010', input: 'magee nic number eka 200012345678V kiyala dhammadha', expected: 'මගේ NIC number එක 200012345678V කියල දැම්මද' }
];

// Dynamically create tests
testScenarios.forEach(({ id, input, expected }) => {
  test(`${id} - input: "${input}"`, async ({ page }) => {
    const output = await convert(page, input);
    expect(output).toContain(expected);
  });
});
