import { test, expect, Page } from '@playwright/test';

// Helper functions for test interactions
class LanguageSwitchingHelper {
  constructor(private page: Page) {}

  async isMobile(): Promise<boolean> {
    const viewportWidth = this.page.viewportSize()?.width || 1200;
    return viewportWidth < 1024;
  }

  async openMobileMenu(): Promise<void> {
    if (await this.isMobile()) {
      // Click hamburger menu button (mobile menu button in header)
      await this.page.locator('button.lg\\:hidden').click();
      // Wait for mobile menu overlay to be visible
      await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
        state: 'visible',
        timeout: 10000 
      });
    }
  }

  async closeMobileMenu(): Promise<void> {
    if (await this.isMobile()) {
      // Click backdrop to close menu (more reliable than hamburger button when menu is open)
      await this.page.locator('div.fixed.inset-0.z-50 div.absolute.inset-0').click();
      // Wait for mobile menu overlay to be hidden
      await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
        state: 'hidden',
        timeout: 5000 
      });
    }
  }

  async switchToLanguage(locale: string): Promise<void> {
    const targetHref = locale === 'en' ? '/' : `/${locale}/`;
    
    if (await this.isMobile()) {
      await this.openMobileMenu();
      // Look for language switcher link in mobile menu (inside the menu content)
      const languageLink = this.page.locator(`div.fixed.inset-0.z-50 a[href="${targetHref}"]`);
      await languageLink.waitFor({ state: 'visible', timeout: 10000 });
      await languageLink.click();
    } else {
      // Desktop: Click language switcher directly (outside mobile menu)
      const languageLink = this.page.locator(`a[href="${targetHref}"]`).first();
      await languageLink.waitFor({ state: 'visible', timeout: 10000 });
      await languageLink.click();
    }
    
    // Wait for navigation to complete
    await this.page.waitForURL(targetHref);
    await this.page.waitForLoadState('networkidle');
    
    // Close mobile menu if it was opened
    if (await this.isMobile()) {
      // Wait for menu to auto-close after navigation or close it manually
      try {
        await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
          state: 'hidden', 
          timeout: 2000 
        });
      } catch {
        // If menu didn't auto-close, try to close it manually
        await this.closeMobileMenu();
      }
    }
  }

  async verifyEnglishContent(): Promise<void> {
    // Use multiple selectors to ensure content is English
    const englishIndicators = [
      'text=Swimming & Triathlon Coach',
      'text=Improve your swimming, cycling and running performance',
      'h3:has-text("Contact Me")',
      'text=Feel free to contact me'
    ];

    // Check for at least one English indicator
    let found = false;
    for (const selector of englishIndicators) {
      try {
        await expect(this.page.locator(selector).first()).toBeVisible({ timeout: 5000 });
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
    // Use multiple selectors to ensure content is Dutch
    const dutchIndicators = [
      'text=Coaching in zwemmen, triathlon en duursporten',
      'h3:has-text("Contacteer mij")',
      'text=Contacteer me vrijblijvend'
    ];

    // Check for at least one Dutch indicator
    let found = false;
    for (const selector of dutchIndicators) {
      try {
        await expect(this.page.locator(selector).first()).toBeVisible({ timeout: 5000 });
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
    const navItems = language === 'en' 
      ? ['About', 'Projects'] 
      : ['Info', 'Projecten'];

    if (await this.isMobile()) {
      await this.openMobileMenu();
      for (const item of navItems) {
        // Look for navigation items inside the mobile menu overlay
        await expect(this.page.locator(`div.fixed.inset-0.z-50 button:has-text("${item}")`).first())
          .toBeVisible({ timeout: 5000 });
      }
      await this.closeMobileMenu();
    } else {
      for (const item of navItems) {
        // Look for navigation items in the desktop header (hidden on mobile)
        await expect(this.page.locator(`nav.hidden.lg\\:flex button:has-text("${item}")`).first())
          .toBeVisible({ timeout: 5000 });
      }
    }
  }
}

test.describe('Language Switching', () => {
  test('should switch between English and Dutch languages', async ({ page }) => {
    const helper = new LanguageSwitchingHelper(page);

    // Navigate to the root page (English)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify we're on the English page
    expect(page.url()).toMatch(/\/$/);

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
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await helper.verifyEnglishContent();

    // Switch to Dutch and verify content
    await helper.switchToLanguage('nl');
    await helper.verifyDutchContent();
  });

  test('should have correct URLs for both languages', async ({ page }) => {
    const helper = new LanguageSwitchingHelper(page);

    // Navigate to English page
    await page.goto('/');
    expect(page.url()).toMatch(/\/$/);
    await helper.verifyEnglishContent();
    
    // Navigate to Dutch page
    await page.goto('/nl/');
    expect(page.url()).toMatch(/\/nl\/$/);
    await helper.verifyDutchContent();
    
    // Navigate back to English
    await page.goto('/');
    expect(page.url()).toMatch(/\/$/);
    await helper.verifyEnglishContent();
  });
});