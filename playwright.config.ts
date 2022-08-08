import {devices, PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    // убери 000 и получишь секунды
    timeout: 86000000,
    //timeout: +process.env.TIMEOUT > 0 ? +process.env.TIMEOUT * 1000 : 60000,

    // Two retries for each test
    //retries: 2,

    //expect: {
    //    timeout: +process.env.EXPECT_TIMEOUT > 0 ? +process.env.EXPECT_TIMEOUT * 1000 : 8000,
    //},
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        //baseURL: process.env.URL ? process.env.URL : 'https://site.ru',
        //actionTimeout: +process.env.ACTION_TIMEOUT > 0 ? +process.env.ACTION_TIMEOUT * 1000 : 34000,
        //navigationTimeout: +process.env.NAVIGATION_TIMEOUT > 0 ? +process.env.NAVIGATION_TIMEOUT * 1000 : 25000,
        //screenshot: "only-on-failure",
        //video: "retain-on-failure",
         //...devices['Desktop Chrome']
    },
};
export default config;
