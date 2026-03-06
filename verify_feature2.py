from playwright.sync_api import sync_playwright, expect
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to local dev server...")
            page.goto("http://localhost:3001")
            page.wait_for_load_state("networkidle")

            print("Looking for 'Financiamento de veículos' card...")
            # The card has an h3 with the title "Financiamento de Veículos" or similar
            # Let's just find the text "Financiamento" and click the button inside that card.

            # Since the database might be empty in the local dev server, let's check if there are any solution cards.
            # If not, we might need to seed the database or check the admin panel.

            cards = page.locator("h3").all_inner_texts()
            print(f"Found h3 texts: {cards}")

            # Let's take a full page screenshot to see what's rendered
            page.screenshot(path="full-page.png", full_page=True)
            print("Saved full-page.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
