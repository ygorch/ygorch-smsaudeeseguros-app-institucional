import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Ensure the server is running on 3001 as we saw earlier
        try:
            await page.goto("http://localhost:3001", timeout=10000)
        except:
             # Fallback to 3000 if 3001 fails
            await page.goto("http://localhost:3000")

        await page.screenshot(path="verification/home_visuals.png", full_page=True)
        await browser.close()
        print("Screenshot taken: verification/home_visuals.png")

asyncio.run(run())
