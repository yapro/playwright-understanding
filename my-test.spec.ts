import {expect, test, Locator} from "@playwright/test";

function delay(ms: number) {
    console.log('delay start:', ms);
    let result = new Promise( resolve => setTimeout(resolve, ms) );
    console.log('delay end:', ms);
    return result;
}
function delaySeconds(seconds: number) {
    console.log('delaySeconds start:', seconds);
    let result = new Promise( resolve => setTimeout(resolve, seconds * 1000) );
    console.log('delaySeconds end:', seconds);
    return result;
}
async function isEnabled(locator:Locator, timeout:number = 100) : Promise<boolean | void> {
    console.log('isEnabled start:');
    let result = await locator.isEnabled({timeout: timeout}).catch((reason) => {
        console.log('isEnabled timeout');
    });
    console.log('isEnabled end:');
    return result;
}
async function getText(locator:Locator, timeout:number = 100) : Promise<string> {
    console.log('getText start:');
    let result = await locator.textContent({timeout: timeout}).catch((reason) => {
        console.log('getText timeout');
    });
    console.log('getText end:');
    return (result === null ? '' : 'x');
}

test('basic test', async ({ page }) => {
    //test.setTimeout(0);
    let i = 0;
    let n = 0;
    let element = null;
    let elements = null;
    let text = null;
    let arrayOfLocators = null
    let countOfLocators = null;
    let count = null;
    let storyFirstButton = null;
    let storyFirstButtonText = null;
    let iFoundStory = 0;
    let allowToStartProcessVariants = true;
    //let isEnabled = false;
    let x = null;

    page.goto('https://ru.duolingo.com/?isLoggingIn=true');
    await delaySeconds(3);
    await page.locator('[data-test="have-account"]').click();
    await page.fill('[data-test="email-input"]', 'lebnikpro@gmail.com');
    await page.fill('[data-test="password-input"]', 'Lebnik22');
    await page.locator('[data-test="register-button"]').click();
    await delaySeconds(3);// 3 секунды чтобы авторизация прошла (куки проставились)
    await delaySeconds(3);
    await page.goto('https://ru.duolingo.com/stories');
    while (true) {
        x = new Date();
        console.log("date:", x.toString());

        await delaySeconds(5);
        const stories = await page.locator('[data-test="story-title"]');
        const storiesCount = await stories.count();
        console.log('storiesCount:', storiesCount);
        for (let storyNumber = 53; storyNumber < storiesCount; storyNumber++) {
            console.log('stories:1');
            // данную историю нужно пройти 10 раз:
            await stories.nth(storyNumber).click({timeout: 1000}).catch((reason) => {
                console.log('stories:1:I waited 1 second');
            });
            console.log('stories:2');
            storyFirstButton = await page.locator('[data-test="story-start-button"]').first();
            storyFirstButtonText = await storyFirstButton.textContent({timeout: 1000});
            if (storyFirstButtonText === 'Текст: +0 очков') {
                continue;
            }
            console.log('stories number:', storyNumber);
            console.log('stories:2:storyFirstButtonText:', storyFirstButtonText);

            await storyFirstButton.click({timeout: 1000}).catch((reason) => {
                console.log('stories:2:I waited 1 second');
            });
            break;
        }
        console.log('stories:3');
        await delaySeconds(3);
        console.log('stories:4');
        //----------------------------------------------------------------------------------------------------------
        while (true) {
            console.log('STEP:0');
            // ждем 10 секунд и:
            // - пробуем сделать click (задержка в 0 секунд)
            // - если есть [data-test="stories-choice"] то кликаем по каждому элементу запускаем перебор (selectThe)
            // - если есть [data-test="stories-player-done"], то завершаем задание
            await page.click('[data-test="stories-player-continue"]', {timeout: 1000}).catch((reason) => {
                console.log('STEP:0:I waited 1 second');
            });
            //--------------------------------Послушайте и составьте фразу:-----------------------------------------
            console.log('STEP:1');
            elements = await page.locator('[data-test="stories-choice"]');

            count = await elements.count();
            if (count > 0) {
                console.log('stories-choice:' + count);
                for (n = 0; n < count; n++) {
                    console.log('STEP:1:', n);
                    for (i = 0; i < count; i++) {
                        if (true === await isEnabled(page.locator('[data-test="stories-player-continue"]'), 1000)) {
                            break;
                        }
                        console.log('STEP:1::', i);
                        console.log('stories-choice click on:' + i);
                        await elements.nth(i).click({timeout: 100}).catch((reason) => {
                        //+await elements.nth(i).click({timeout: 1000}).catch((reason) => {
                            console.log('I waited 1 second');
                        });
                    }
                }
            }
            //--------------------------------challenge-tap-token:--------------------------------------------------
            console.log('STEP:2');
            elements = await page.locator('[data-test="challenge-tap-token"]');
            count = await elements.count();
            if (count > 0) {
                //--------------------------------подобрать вариант:------------------------------------------------
                if (count === 10) {
                    //if (allowToStartProcessVariants) {
                    //    allowToStartProcessVariants = false;
                        await delay(500);
                        console.log('STEP:4:start');
                        for (i = 0; i < 5; ++i) {
                            console.log('STEP:4:'+i);
                            for (n = 5; n < count; ++n) {
                                console.log('STEP:4:'+i+':'+n, 'step 1');
                                if (true === await isEnabled(page.locator('[data-test="stories-player-continue"]'), 1000)) {
                                    console.log('STEP:4:break 1');
                                    break;
                                }
                                console.log('STEP:4:'+i+':'+n, 'step 2');
                                if (true === await isEnabled(elements.nth(i))) {
                                    console.log('STEP:4:'+i+':'+n, 'step 2.1');
                                    await elements.nth(i).click({timeout: 1000}).catch((reason) => {
                                        console.log('variant:'+i, 'I waited click');
                                    });
                                    console.log('STEP:4:'+i+':'+n, 'step 2.2');
                                    await delay(500);
                                }
                                console.log('STEP:4:'+i+':'+n, 'step 3');
                                if (true === await isEnabled(elements.nth(n))) {
                                    console.log('STEP:4:'+i+':'+n, 'step 3.1');
                                    await elements.nth(n).click({timeout: 1000}).catch((reason) => {
                                        console.log('variant:' + n, 'I waited click');
                                    });
                                    console.log('STEP:4:'+i+':'+n, 'step 3.2');
                                    await delay(500);
                                    console.log('STEP:4:'+i+':'+n, 'step 3.3');
                                    if (false === await isEnabled(elements.nth(n))) {
                                        console.log('STEP:4:break 2');
                                        break;
                                    }
                                    console.log('STEP:4:'+i+':'+n, 'step 3.4');
                                }
                                console.log('STEP:4:'+i+':'+n, 'step 4');

                                //= await elements.nth(i).click({timeout: 2000}).catch((reason) => {
                                //=     console.log('variant:', i, 'I waited click');
                                //= });
                                //= await delay(500);
                                //= await elements.nth(n).click({timeout: 2000}).catch((reason) => {
                                //=     console.log('variant right', n, 'I waited click');
                                //= });
                                //= await delay(500);

                                //+ text = await elements.nth(i).getAttribute('aria-disabled', {timeout: 10}).catch((reason) => {
                                //+     console.log('variant left:', i, 'I waited aria-disabled');
                                //+ });
                                //+ if ('true' !== text) {
                                //+     await elements.nth(i).click({timeout: 2000}).catch((reason) => {
                                //+         console.log('variant:', i, 'I waited click');
                                //+     });
                                //+     await delay(700);
                                //+ }
                                //+ text = await elements.nth(n).getAttribute('aria-disabled', {timeout: 10}).catch((reason) => {
                                //+     console.log('variant right', n, 'I waited aria-disabled');
                                //+ });
                                //+ if ('true' !== text) {
                                //+     await elements.nth(n).click({timeout: 2000}).catch((reason) => {
                                //+         console.log('variant right', n, 'I waited click');
                                //+     });
                                //+     await delay(700);
                                //+ }

                                // console.log('variant:'+n);
                                // // если текущий суб-элемент уже выбирался ранее, то пропускаем его:
                                // text = await elements.nth(n).getAttribute('aria-disabled', {timeout: 10}).catch((reason) => {
                                //     console.log('variant:'+n+':I waited aria-disabled');
                                // });
                                // console.log('variant:'+n+':2');
                                // if ('true' === text) {
                                //     console.log('variant:'+n+':continue');
                                //     continue;
                                // }
                                // console.log('variant:'+i);
                                // await elements.nth(i).click({timeout: 500}).catch((reason) => {
                                //     console.log('variant:'+i+':I waited click');
                                // });
                                // console.log('variant:'+i+':delay start');
                                // await delay(1000);
                                // console.log('variant:'+i+':delay stop');
                                // console.log('variant:'+n+':3');
                                // await elements.nth(n).click({timeout: 500}).catch((reason) => {
                                //     console.log('variant:'+n+':3:I waited click');
                                // });
                                // console.log('variant:'+n+':4');
                                // await delay(1000);
                                // console.log('variant:'+n+':5');
                                //                             // если текущий элемент выбрался (значит является верным ответом), то прекращаем итерацию:
                                // text = await elements.nth(n).getAttribute('aria-disabled', {timeout: 10}).catch((reason) => {
                                //     console.log('variant:'+n+':5:I waited aria-disabled');
                                // });
                                // console.log('variant:'+n+':6');
                                // if ('true' === text) {
                                //     console.log('variant:'+n+':6:break');
                                //     break;
                                // }
                                // console.log('variant:'+n+':7');
                            }
                        }
                        console.log('STEP:4:end');
                        await delay(2000);

                    //}
                }
                //--------------------------------Послушайте и составьте фразу:-----------------------------------------
                else {
                    console.log('STEP:3');
                    for (n = 0; n < count; n++) {
                        console.log('STEP:3:', n);
                        for (i = 0; i < count; i++) {
                            if (true === await isEnabled(page.locator('[data-test="stories-player-continue"]'),1000)) {
                                break;
                            }
                            console.log('stories-choice click on:' + i);
                            await elements.nth(i).click({timeout: 1000}).catch((reason) => {
                                console.log('I waited 1 second');
                            });
                        }
                    }
                }
            }
            //--------------------------------завершаю историю:-----------------------------------------------------
            console.log('STEP:5');
            elements = await page.locator('[data-test="stories-player-done"]');
            count = await elements.count();
            if (count > 0) {
                await page.click('[data-test="stories-player-done"]', {timeout: 1000}).catch((reason) => {
                    console.log('I waited 1 second');
                });
                break;
            }
            //---------------если история завершена и пользователя выкинуло на страницу с историями:----------------
            elements = await page.locator('[data-test="story-title"]');
            count = await stories.count();
            if (count > 0) {
                //allowToStartProcessVariants = true;
                console.log('I exited from tasks');
                break;
            }
        }
    }
});
/*text = await elements.nth(n).evaluate(node => node.getAttribute('aria-disabled'), {timeout: 1000}).catch((reason) => {
    console.log('I waited 1 second');
});*/
//await divs.nth(n).evaluate(node => node.getAttributes())
//console.log('isAriaDisabled:', isAriaDisabled);
//let rightButton = await divs.nth(n);
//console.log('rightButton:', rightButton);
//console.log('rightButton:', rightButton.constructor.name);
    //aria-disabled="true"

    // playwright.$('[data-test="stories-choice"] >> xpath=..')
    //await delay(1000);
    //const locators1 = await page.locator('[data-test="stories-choice"]');
    //await delay(1000);
    //const locators1count = await locators1.count();
    //await delay(1000);
    //console.log('elementsCount', locators1count);
    //for (let index = 0; index < locators1count ; index++) {
    //    element = await locators1.nth(index);
    //    console.log('MY element name:', element.constructor.name);
    //    //const innerText = await element.parentNode.innerText();
    //    //console.log('element-innerText', innerText);
    //}
    //let leh = await locators1.elementHandles();
    //console.log('leh', leh);
//
//
    //await delay(50000000);
    //await page.locator('[data-test="stories-choice"]').evaluateAll(function (list) {
    //    console.log('listlist', list);
    //    list.forEach((element) => {
    //        console.log('element-textContent', element.parentNode.textContent);
    //    })//(element => element.textContent)
    //});
    //count = await elements.count()
    //for (let i = 0; i < count; ++i) {
    //    console.log('textContent', await elements.nth(i).textContent());
//
    //    //await parent_node.click();
//
    //}

/*    const divs = page.locator('[data-test="challenge-tap-token-text"]');
    const count = await divs.count()
    for (let i = 0; i < count; ++i) {
        let leftText = await divs.nth(i).textContent();
        let searchText = mapDictionary.get(leftText);
        if (typeof searchText === 'undefined') {
            console.log('Need to add:', leftText);
        }
        for (let n = 0; n < count; ++n) {
            let rightText = await divs.nth(n).textContent();
            if (rightText === searchText) {
                divs.nth(n).click();
            }
        }
    }*/
    // const paragraphs = await page.$$('#js-hook-description > div > p')
    // for (const p of paragraphs) {
    //     const actualPara = await page.evaluate(el => el.innerText.trim(), p)
    //     textArray.push(actualPara)
    //     console.log(JSON.stringify(textArray))
    // }

    //-console.log(page.locator('[data-test="challenge-tap-token-text"]'))
    //-console.log(page.$$('[data-test="challenge-tap-token-text"]'))
    //page.locator('[data-test="challenge-tap-token-text"]').elements.forEach((element) => {
    //    console.log(element)
    //})
