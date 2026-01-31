const { test, expect } = require('@playwright/test');

// Test Data
const testData = {
  positive: [
    // 1. Sentence Structures
    { id: 'Pos_Fun_0001', name: 'Simple sentence', input: 'oyaa.', expected: 'ඔයා.', length: 'S' },
    { id: 'Pos_Fun_0002', name: 'Compound sentence', input: 'kanna!', expected: 'කන්න!', length: 'S' },
    { id: 'Pos_Fun_0003', name: 'Compound sentence long', input: 'puluvan dha?', expected: 'පුළුවන් ද?', length: 'S' },

    // 2. Punctuation & Symbols
    { id: 'Pos_Fun_0004', name: 'Convert a polite phrase with commaed', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?', length: 'S' },
    { id: 'Pos_Fun_0005', name: 'Convert a informal introduction', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!', length: 'S' },
    { id: 'Pos_Fun_0006', name: 'Convert a simple sentence + repetition', input: 'mata oya potha aran dhenna puluvan dha?', expected: 'මට ඔය පොත අරන් දෙන්න පුලුවන් ද?', length: 'S' },
    { id: 'Pos_Fun_0007', name: 'Convert a compound sentence', input: 'karunaakarala nishshabdhava raedhii sitinna.', expected: 'කරුනාකරල නිශ්ශබ්දව රැදී සිටින්න.', length: 'S' },
    { id: 'Pos_Fun_0008', name: 'Convert a complex sentence', input: 'kivvama ahala karapam', expected: 'කිව්වම අහල කරපම්', length: 'S' },
    { id: 'Pos_Fun_0009', name: 'Convert a day-to-day conversation+temporal', input: 'mata methana inna baehae', expected: 'මට මෙතන ඉන්න බැහැ', length: 'S' },
    { id: 'Pos_Fun_0010', name: 'Convert a compound sentence complex', input: 'mata meeka karala dhenna puluvan , namuth mama yam mudhalak aya karanavaa', expected: 'මට මේක කරල දෙන්න පුලුවන් , නමුත් මම යම් මුදලක් අය කරනවා', length: 'S' },

    // 3. Word Variations
    { id: 'Pos_Fun_0011', name: 'Convert past tense variations', input: 'mama illana mudhala dhenavaanQQ mata meeka karala dhenna puluvan', expected: 'මම ඉල්ලන මුදල දෙනවානං මට මේක කරල දෙන්න පුලුවන්', length: 'S' },
    { id: 'Pos_Fun_0012', name: 'Convert a mixed +npl + lowercase', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?', length: 'S' },
    { id: 'Pos_Fun_0013', name: 'Convert a short sentence + quoted place', input: 'oyaata meeka use karanna puluvan haebaey dhena upadhes pilipadhinavadha ?', expected: 'ඔයාට මේක use කරන්න පුලුවන් හැබැය් දෙන උපදෙස් පිලිපදිනවද ?', length: 'S' },
    { id: 'Pos_Fun_0014', name: 'Convert a day-to-day request', input: 'eyaaiiyevaedakaralanaehae', expected: 'එයාඊයෙවැඩකරලනැහැ', length: 'S' },
    { id: 'Pos_Fun_0015', name: 'Convert a public place +interactive guidance', input: 'oyaata school ekee homework eka karanna puluvan dha?', expected: 'ඔයාට school එකේ homework එක කරන්න පුලුවන් ද?', length: 'S' },
    { id: 'Pos_Fun_0016', name: 'Convert a sentence with compound words', input: 'mata mee rs.15000 tika tika gevanna puluvan', expected: 'මට මේ rs.15000 ටික ටික ගෙවන්න පුලුවන්', length: 'S' },
    { id: 'Pos_Fun_0017', name: 'Convert a paragraph with technical English m', input: 'oyaa 22 venidhaa magee birthday  ekata enna', expected: 'ඔයා 22 වෙනිදා මගේ birthday  එකට එන්න', length: 'M' },
    { id: 'Pos_Fun_0018', name: 'Convert a sentence with multi repeated', input: 'Please, adhaala pudhgalayaa pamanak mee lipiya baaragannavadha ?', expected: 'Please, අදාල පුද්ගලයා පමනක් මේ ලිපිය බාරගන්නවද ?', length: 'S' },
    { id: 'Pos_Fun_0019', name: 'Convert a informal +accumulated text', input: 'anee mata mee phone number eka thavath use karanna baehae haebaey aluth phone ekak aran dhenavanQQ mama meeka use karannam', expected: 'අනේ මට මේ phone number එක තවත් use කරන්න බැහැ හැබැය් අලුත් phone එකක් අරන් දෙනවනං මම මේක use කරන්නම්', length: 'S' },
    { id: 'Pos_Fun_0020', name: 'Convert a para with long statement +time', input: 'iiye raee 10 pm vedhdhii api server eka update  kalaa namuth thavamath gaetaluva visadhilaa naehae kiyaladha department  eka dhaenum dhunnee ? apita mee sidhuviima gaena vaedidhura visthara dhaenaganna avashYAyi.karunaakaralaa apiva whatsapp harahaa sambandha karaganna', expected: 'ඊයෙ රෑ 10 pm වෙද්දී අපි server එක update  කලා නමුත් තවමත් ගැටලුව විසදිලා නැහැ කියලද department  එක දැනුම් දුන්නේ ? අපිට මේ සිදුවීම ගැන වැඩිදුර විස්තර දැනගන්න අවශ්‍යයි.කරුනාකරලා අපිව whatsapp හරහා සම්බන්ද කරගන්න', length: 'S' },
    { id: 'Pos_Fun_0021', name: 'Convert a day-to-day greeting sentence', input: 'api IT lab ekata ikmanata ikmanata giyaa ', expected: 'අපි IT lab එකට ඉක්මනට ඉක්මනට ගියා', length: 'S' },
    { id: 'Pos_Fun_0022', name: 'Convert a complex, Mama kala yna passai myyas', input: 'ubata adha havasa baerinQQ 22 havasata varen', expected: 'උබට අද හවස බැරිනං 22 හවසට වරෙන්', length: 'S' },
    { id: 'Pos_Fun_0023', name: 'Convert a library reference Duwa', input: 'suba udhaeesanak yaaluvanee ; mama 8.30 vedhdhii office  ekata aavaa namuth mata meeting  ekata yanna baeri unaa. api ee gaena kathaa kara kara idhiyee', expected: 'සුබ උදෑසනක් යාලුවනේ ; මම 8.30 වෙද්දී office  එකට ආවා නමුත් මට meeting  එකට යන්න බැරි උනා. අපි ඒ ගැන කතා කර කර ඉදියේ', length: 'S' },
    { id: 'Pos_Fun_0024', name: 'Convert a short request phrase', input: 'oyaala haemootama suba raathriyak !', expected: 'ඔයාල හැමෝටම සුබ රාත්‍රියක් !', length: 'S' },
  ],

  negative: [
    // 1. Edge Cases - Joined words issue
    { id: 'Neg_Fun_0025', name: 'Convert a url link', input: 'visit http://www.google.com', expected: 'visit http://www.google.com', issue: 'URL should not convert', length: 'S' },
    { id: 'Neg_Fun_0026', name: 'Convert a blind tags', input: 'click <li>paragraph in sub</li>', expected: 'click <li>paragraph in sub</li>', issue: 'HTML tags should not convert', length: 'S' },
    { id: 'Neg_Fun_0027', name: 'Convert a math equation', input: 'solve for x 2x+y=10', expected: 'solve for x 2x+y=10', issue: 'Math equations should not convert', length: 'S' },
    { id: 'Neg_Fun_0028', name: 'Convert an email address', input: 'contact me at hi@gmail.com', expected: 'contact me at hi@gmail.com', issue: 'Email addresses should not convert', length: 'S' },
    { id: 'Neg_Fun_0029', name: 'Convert special case types', input: 'str plooa daua pisuwai', expected: 'str plooa daua pisuwai', issue: 'Incomplete words may not convert', length: 'S' },
    { id: 'Neg_Fun_0030', name: 'Convert exclamation case llana', input: 'I Love it laka', expected: 'I Love it laka', issue: 'Mixed case may not convert properly', length: 'S' },
    { id: 'Neg_Fun_0031', name: 'Convert special characters', input: 'layy!!!!!!?', expected: 'layy!!!!!!?', issue: 'Special characters with words may fail', length: 'S' },
    { id: 'Neg_Fun_0032', name: 'Convert tun abbreviations', input: 'ur later', expected: 'ur later', issue: 'Abbreviations may not convert', length: 'S' },
    { id: 'Neg_Fun_0033', name: 'Convert for puffa', input: 'save to notefollow/skip', expected: 'Save to notefollow/skip', issue: 'Incomplete/malformed phrases may fail', length: 'S' },
    { id: 'Neg_Fun_0034', name: 'Convert unique words x', input: 'Ilaka nes tisrd dal', expected: 'Ilaka nes tisrd dal', issue: 'Nonsense words should not convert', length: 'S' },
    { id: 'Neg_Fun_0035', name: 'Missing spaces', input: 'කuse is rising', expected: 'කuse is rising', issue: 'Mixed Sinhala and English may not convert', length: 'M' },
    { id: 'Neg_Fun_0036', name: 'English abbreviation', input: 'https://google.com', expected: 'https://google.com', issue: 'URLs should not convert', length: 'M' },
  ],
};

test.describe('Singlish to Sinhala Translator Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.swifttranslator.com/');
  });

  test.afterEach(async () => {
    await page.close();
  });

  // Helper function to execute test
  async function runTest(inputText) {
    // Find the textarea by its class
    const inputField = page.locator('textarea.w-full.h-80').first();

    // Clear and type
    await inputField.clear();
    await inputField.type(inputText);
    await page.keyboard.press('Space'); // Trigger conversion

    // Find output field
    const outputField = page.locator('.w-full.h-80').nth(1);

    // Wait for text to appear using polling
    await expect
      .poll(
        async () => {
          const text = await outputField.innerText();
          return text && text.trim().length > 0;
        },
        {
          message: 'Waited for translation to appear',
          timeout: 100000,
        },
      )
      .toBe(true);

    return (await outputField.innerText()).trim();
  }

  // POSITIVE TESTS
  for (const testCase of testData.positive) {
    test(`Positive Test ${testCase.id}: ${testCase.name}`, async () => {
      const actualOutput = await runTest(testCase.input);

      console.log(`Test: ${testCase.name}`);
      console.log(`Input: ${testCase.input}`);
      console.log(`Expected: ${testCase.expected}`);
      console.log(`Actual: ${actualOutput}`);

      const fs = require('fs');
      fs.appendFileSync(
        'test-debug.log',
        `\nTest: ${testCase.name}\nExpected: "${testCase.expected}"\nActual:   "${actualOutput}"\n`,
      );

      // Check if output is not empty
      expect(
        actualOutput,
        `Output was empty for input: ${testCase.input}`,
      ).toBeTruthy();

      // Strict check with trim
      expect(
        actualOutput.trim(),
        `Expected "${testCase.expected}" but got "${actualOutput.trim()}"`,
      ).toBe(testCase.expected);

      // For simple verification, we check if output contains Sinhala characters
      const sinhalaRegex = /[\u0D80-\u0DFF]/;
      expect(sinhalaRegex.test(actualOutput)).toBeTruthy();
    });
  }

  // NEGATIVE TESTS
  for (const testCase of testData.negative) {
    test(`Negative Test ${testCase.id}: ${testCase.name}`, async () => {
      const actualOutput = await runTest(testCase.input);

      console.log(`Negative Test: ${testCase.name}`);
      console.log(`Input: ${testCase.input}`);
      console.log(`Expected Issue: ${testCase.issue}`);
      console.log(`Actual: ${actualOutput}`);

      // For negative tests, we might expect:
      // 1. Output to be empty or incorrect
      // 2. English terms to remain unchanged
      // 3. Formatting issues

      if (testCase.expected) {
        // If we have expected value, check if it matches
        expect(
          actualOutput,
          `Output was empty for input: ${testCase.input}`,
        ).toBeTruthy();
        expect(
          actualOutput,
          `Expected "${testCase.expected}" but got "${actualOutput}"`,
        ).toBe(testCase.expected);
      }
    });
  }

  // UI TEST - Real-time conversion
  test('Pos_UI_0001', async () => {
    // Find input textarea
    const inputField = page.locator('textarea.w-full.h-80').first();
    const outputField = page.locator('.w-full.h-80').nth(1);

    // Test 1: Type character by character
    console.log('Testing real-time conversion...');

    await inputField.clear();
    await inputField.type('m');
    await page.keyboard.press('Space'); // Trigger
    await expect
      .poll(async () => (await outputField.innerText()).trim())
      .not.toBe('');

    const output1 = (await outputField.innerText()).trim();
    console.log('After typing "m ":', output1);

    await inputField.type('a');
    await page.keyboard.press('Space'); // Trigger again
    await expect
      .poll(async () => (await outputField.innerText()).trim())
      .not.toBe(output1);

    const output2 = (await outputField.innerText()).trim();
    console.log('After typing "ma ":', output2);

    // Check that output is updating
    expect(output1).not.toBe(output2);
  });
});