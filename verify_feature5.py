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

            print("Finding 'Financiamento de Veículos' card...")

            # Use get_by_role for button
            button = page.get_by_role("button", name="Cotar Financiamento")

            # Since the button text is configurable, let's try getting by heading then finding any button
            if not button.is_visible():
                heading = page.get_by_role("heading", name="Financiamento de Veículos")
                container = heading.locator("..").locator("..")
                button = container.locator("button")

            print("Clicking button...")
            button.click()

            print("Waiting for modal to appear...")
            page.wait_for_selector("div[role='dialog']")
            time.sleep(1) # Let animations finish

            print("Taking screenshot of the modal...")
            page.screenshot(path="modal-financiamento.png")

            # Now let's test PJ
            print("Clicking PJ switch...")
            pj_switch = page.locator("button[role='switch']")
            pj_switch.click()
            time.sleep(1)

            print("Taking screenshot of PJ modal...")
            page.screenshot(path="modal-financiamento-pj.png")

            print("Success!")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error-state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
