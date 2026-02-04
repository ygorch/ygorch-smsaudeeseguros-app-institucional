from playwright.sync_api import sync_playwright

def verify(page):
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")

    # Take a full page screenshot
    page.screenshot(path="verification/landing_page_full.png", full_page=True)

    print("Screenshot taken: verification/landing_page_full.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
