import { test, expect, Page } from '@playwright/test';

// Helper functions for test interactions
class LanguageSwitchingHelper {
  constructor(private page: Page) {}

  async isMobile(): Promise<boolean> {
    const viewportWidth = this.page.viewportSize()?.width || 1200;
    return viewportWidth < 1024;
  }

  async isMobileSafari(): Promise<boolean> {
    const userAgent = await this.page.evaluate(() => navigator.userAgent);
    return userAgent.includes('Mobile') && userAgent.includes('Safari') && !userAgent.includes('Chrome');
  }

  async openMobileMenu(): Promise<void> {
    if (await this.isMobile()) {
      const timeout = 10000;
      
      // Click hamburger menu button (mobile menu button in header)
      const menuButton = this.page.locator('button.lg\\:hidden');
      await menuButton.waitFor({ state: 'visible', timeout });
      await menuButton.click();
      
      // Wait for mobile menu overlay to be visible
      await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
        state: 'visible',
        timeout 
      });
      
      // Wait for menu content to be fully rendered
      await this.page.waitForTimeout(300);
    }
  }

  async closeMobileMenu(): Promise<void> {
    if (await this.isMobile()) {
      const timeout = 5000;
      
      // Try pressing Escape key first (most reliable for mobile browsers)
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
          state: 'hidden',
          timeout: 3000 
        });
      } catch {
        // Fallback: Try clicking outside the menu area
        try {
          // Click on a specific coordinate outside the menu (left side of screen)
          await this.page.mouse.click(50, 200);
          await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
            state: 'hidden',
            timeout: 3000 
          });
        } catch {
          // Final fallback: Force close using the hamburger button
          const hamburgerButton = this.page.locator('button.lg\\:hidden');
          await hamburgerButton.click({ force: true });
          await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
            state: 'hidden',
            timeout 
          });
        }
      }
      
      // Brief wait for menu animation to complete
      await this.page.waitForTimeout(200);
    }
  }

  async switchToLanguage(locale: string): Promise<void> {
    // The language switcher shows the OTHER language
    // When we want to switch TO 'en', we click the switcher that says "EN"
    // When we want to switch TO 'nl', we click the switcher that says "NL"
    const switcherText = locale.toUpperCase();
    const timeout = 10000;
    
    if (await this.isMobile()) {
      await this.openMobileMenu();
      
      // Look for language switcher link in mobile menu by text
      const languageLink = this.page.locator(`div.fixed.inset-0.z-50`).getByRole('link', { name: switcherText });
      await languageLink.waitFor({ state: 'visible', timeout });
      await languageLink.click();
    } else {
      // Desktop: Click language switcher by text (more reliable than href)
      const languageLink = this.page.getByRole('link', { name: switcherText }).first();
      await languageLink.waitFor({ state: 'visible', timeout });
      await languageLink.click();
    }
    
    // Wait for navigation to complete
    await this.page.waitForURL(new RegExp(`\\/${locale}\\/?$`), { timeout });
    await this.page.waitForLoadState('networkidle', { timeout });
    
    // Close mobile menu if it was opened
    if (await this.isMobile()) {
      // Wait for menu to auto-close after navigation or close it manually
      try {
        await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
          state: 'hidden', 
          timeout: 3000 
        });
      } catch {
        // If menu didn't auto-close, try to close it manually
        await this.closeMobileMenu();
      }
    }
  }

  async verifyEnglishContent(): Promise<void> {
    const timeout = 10000;
    
    // Use multiple selectors to ensure content is English
    const englishIndicators = [
      'text=Swimming & Triathlon Coach',
      'text=Improve your swimming, cycling and running performance',
      'h3:has-text("Contact Me")',
      'text=Feel free to contact me'
    ];

    // Wait for page to be fully loaded before checking content
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);

    // Check for at least one English indicator
    let found = false;
    for (const selector of englishIndicators) {
      try {
        await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
        found = true;
        break;
      } catch {
        continue;
      }
    }
    
    if (!found) {
      throw new Error('No English content indicators found');
    }
  }

  async verifyDutchContent(): Promise<void> {
    const timeout = 10000;
    
    // Use multiple selectors to ensure content is Dutch
    const dutchIndicators = [
      'text=Coaching in zwemmen, triatlon en duursporten',
      'h3:has-text("Contacteer mij")',
      'text=Contacteer me vrijblijvend'
    ];

    // Wait for page to be fully loaded before checking content
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(500);

    // Check for at least one Dutch indicator
    let found = false;
    for (const selector of dutchIndicators) {
      try {
        await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
        found = true;
        break;
      } catch {
        continue;
      }
    }
    
    if (!found) {
      throw new Error('No Dutch content indicators found');
    }
  }

  async verifyNavigation(language: 'en' | 'nl'): Promise<void> {
    const timeout = 10000;
    const navItems = language === 'en' 
      ? ['About', 'Projects'] 
      : ['Info', 'Projecten'];

    if (await this.isMobile()) {
      await this.openMobileMenu();
      
      for (const item of navItems) {
        // Look for navigation items inside the mobile menu overlay
        await expect(this.page.locator(`div.fixed.inset-0.z-50 button:has-text("${item}")`).first())
          .toBeVisible({ timeout });
      }
      await this.closeMobileMenu();
    } else {
      for (const item of navItems) {
        // Look for navigation items in the desktop header (hidden on mobile)
        await expect(this.page.locator(`nav.hidden.lg\\:flex button:has-text("${item}")`).first())
          .toBeVisible({ timeout });
      }
    }
  }
}

test.describe('Language Switching', () => {
  test('should switch between English and Dutch languages', async ({ page }) => {
    const helper = new LanguageSwitchingHelper(page);

    // Navigate to the English page
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');

    // Verify we're on the English page
    expect(page.url()).toMatch(/\/en\/?$/);

    // Verify English navigation is present
    await helper.verifyNavigation('en');

    // Switch to Dutch
    await helper.switchToLanguage('nl');

    // Verify Dutch content is displayed
    await helper.verifyDutchContent();
    
    // Verify Dutch navigation is present
    await helper.verifyNavigation('nl');

    // Switch back to English
    await helper.switchToLanguage('en');

    // Verify English content is restored
    await helper.verifyEnglishContent();
    
    // Verify English navigation is restored
    await helper.verifyNavigation('en');
  });

  test('should display different content for different languages', async ({ page }) => {
    const helper = new LanguageSwitchingHelper(page);

    // Test English content
    await page.goto('/en/');
    await page.waitForLoadState('networkidle');
    
    await helper.verifyEnglishContent();

    // Switch to Dutch and verify content
    await helper.switchToLanguage('nl');
    await helper.verifyDutchContent();
  });

  test('should have correct URLs for both languages', async ({ page }) => {
    const helper = new LanguageSwitchingHelper(page);

    // Navigate to English page
    await page.goto('/en/');
    expect(page.url()).toMatch(/\/en\/?$/);
    await helper.verifyEnglishContent();
    
    // Navigate to Dutch page
    await page.goto('/nl/');
    expect(page.url()).toMatch(/\/nl\/?$/);
    await helper.verifyDutchContent();
    
    // Navigate back to English
    await page.goto('/en/');
    expect(page.url()).toMatch(/\/en\/?$/);
    await helper.verifyEnglishContent();
  });
});