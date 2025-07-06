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
      const isSafari = await this.isMobileSafari();
      const timeout = isSafari ? 15000 : 10000;
      
      // Click hamburger menu button (mobile menu button in header)
      const menuButton = this.page.locator('button.lg\\:hidden');
      await menuButton.waitFor({ state: 'visible', timeout });
      await menuButton.click();
      
      // Wait for mobile menu overlay to be visible with extended timeout for Safari
      await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
        state: 'visible',
        timeout 
      });
      
      // Additional wait for Safari to ensure menu is fully rendered
      if (isSafari) {
        await this.page.waitForTimeout(500);
        // Verify menu content is actually visible
        await this.page.waitForSelector('div.fixed.inset-0.z-50 nav', { state: 'visible', timeout: 5000 });
      }
    }
  }

  async closeMobileMenu(): Promise<void> {
    if (await this.isMobile()) {
      const isSafari = await this.isMobileSafari();
      const timeout = isSafari ? 10000 : 5000;
      
      // Mobile Safari has issues with backdrop clicks being intercepted by menu content
      // Try multiple strategies to close the menu
      let menuClosed = false;
      
      if (isSafari) {
        // Strategy 1: Try clicking the hamburger button to close
        try {
          const hamburgerButton = this.page.locator('button.lg\\:hidden');
          await hamburgerButton.click({ timeout: 3000 });
          await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
            state: 'hidden',
            timeout: 3000 
          });
          menuClosed = true;
        } catch {
          // Strategy 2: Use Escape key
          try {
            await this.page.keyboard.press('Escape');
            await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
              state: 'hidden',
              timeout: 3000 
            });
            menuClosed = true;
          } catch {
            // Strategy 3: Force click on a specific coordinate outside menu
            try {
              // Click on the left side of the screen (outside the menu which is on the right)
              await this.page.mouse.click(50, 200);
              await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
                state: 'hidden',
                timeout: 3000 
              });
              menuClosed = true;
            } catch {
              // Strategy 4: Force click the backdrop with force option
              const backdrop = this.page.locator('div.fixed.inset-0.z-50 div.absolute.inset-0');
              await backdrop.click({ force: true, timeout: 3000 });
              await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
                state: 'hidden',
                timeout: 3000 
              });
              menuClosed = true;
            }
          }
        }
      } else {
        // For non-Safari browsers, use the original backdrop click method
        const backdrop = this.page.locator('div.fixed.inset-0.z-50 div.absolute.inset-0');
        await backdrop.waitFor({ state: 'visible', timeout });
        await backdrop.click();
        await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
          state: 'hidden',
          timeout 
        });
        menuClosed = true;
      }
      
      // Final verification that menu is actually closed
      if (!menuClosed) {
        throw new Error('Failed to close mobile menu after trying all strategies');
      }
      
      // Additional verification for Safari
      if (isSafari) {
        await this.page.waitForTimeout(300);
      }
    }
  }

  async switchToLanguage(locale: string): Promise<void> {
    // The language switcher shows the OTHER language
    // When we want to switch TO 'en', we click the switcher that says "EN" which goes to '/en/'
    // When we want to switch TO 'nl', we click the switcher that says "NL" which goes to '/nl/'
    const switcherHref = `/${locale}/`;
    const expectedUrl = `/${locale}/`;
    const isSafari = await this.isMobileSafari();
    const timeout = isSafari ? 15000 : 10000;
    
    if (await this.isMobile()) {
      await this.openMobileMenu();
      
      // Look for language switcher link in mobile menu with multiple selector strategies
      let languageLink = this.page.locator(`div.fixed.inset-0.z-50 a[href="${switcherHref}"]`);
      
      // Try alternative selectors if the first one doesn't work (Safari specific)
      try {
        await languageLink.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        // Try broader selector for Safari
        languageLink = this.page.locator(`div.fixed.inset-0.z-50`).locator(`a[href="${switcherHref}"]`);
        await languageLink.waitFor({ state: 'visible', timeout });
      }
      
      // Ensure element is clickable before clicking (Safari needs this)
      if (isSafari) {
        await languageLink.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
      }
      
      await languageLink.click();
    } else {
      // Desktop: Click language switcher directly (outside mobile menu)
      const languageLink = this.page.locator(`a[href="${switcherHref}"]`).first();
      await languageLink.waitFor({ state: 'visible', timeout });
      await languageLink.click();
    }
    
    // Wait for navigation to complete with enhanced Safari handling
    await this.page.waitForURL(expectedUrl, { timeout });
    await this.page.waitForLoadState('networkidle', { timeout });
    
    // Additional wait for Safari to ensure DOM is fully updated
    if (isSafari) {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      await this.page.waitForTimeout(500);
    }
    
    // Close mobile menu if it was opened
    if (await this.isMobile()) {
      // Wait for menu to auto-close after navigation or close it manually
      try {
        await this.page.waitForSelector('div.fixed.inset-0.z-50', { 
          state: 'hidden', 
          timeout: isSafari ? 5000 : 2000 
        });
      } catch {
        // If menu didn't auto-close, try to close it manually
        await this.closeMobileMenu();
      }
    }
  }

  async verifyEnglishContent(): Promise<void> {
    const isSafari = await this.isMobileSafari();
    const timeout = isSafari ? 10000 : 5000;
    
    // Use multiple selectors to ensure content is English
    const englishIndicators = [
      'text=Swimming & Triathlon Coach',
      'text=Improve your swimming, cycling and running performance',
      'h3:has-text("Contact Me")',
      'text=Feel free to contact me'
    ];

    // Wait for page to be fully loaded before checking content (Safari needs this)
    if (isSafari) {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);
    }

    // Check for at least one English indicator with retry logic for Safari
    let found = false;
    let attempts = isSafari ? 3 : 1;
    
    for (let attempt = 0; attempt < attempts && !found; attempt++) {
      for (const selector of englishIndicators) {
        try {
          await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
          found = true;
          break;
        } catch {
          continue;
        }
      }
      
      // If not found on Safari, wait and retry
      if (!found && isSafari && attempt < attempts - 1) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    if (!found) {
      throw new Error('No English content indicators found');
    }
  }

  async verifyDutchContent(): Promise<void> {
    const isSafari = await this.isMobileSafari();
    const timeout = isSafari ? 10000 : 5000;
    
    // Use multiple selectors to ensure content is Dutch
    const dutchIndicators = [
      'text=Coaching in zwemmen, triatlon en duursporten',
      'h3:has-text("Contacteer mij")',
      'text=Contacteer me vrijblijvend'
    ];

    // Wait for page to be fully loaded before checking content (Safari needs this)
    if (isSafari) {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);
    }

    // Check for at least one Dutch indicator with retry logic for Safari
    let found = false;
    let attempts = isSafari ? 3 : 1;
    
    for (let attempt = 0; attempt < attempts && !found; attempt++) {
      for (const selector of dutchIndicators) {
        try {
          await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
          found = true;
          break;
        } catch {
          continue;
        }
      }
      
      // If not found on Safari, wait and retry
      if (!found && isSafari && attempt < attempts - 1) {
        await this.page.waitForTimeout(1000);
      }
    }
    
    if (!found) {
      throw new Error('No Dutch content indicators found');
    }
  }

  async verifyNavigation(language: 'en' | 'nl'): Promise<void> {
    const isSafari = await this.isMobileSafari();
    const timeout = isSafari ? 10000 : 5000;
    const navItems = language === 'en' 
      ? ['About', 'Projects'] 
      : ['Info', 'Projecten'];

    if (await this.isMobile()) {
      await this.openMobileMenu();
      
      // Additional wait for Safari to ensure menu content is rendered
      if (isSafari) {
        await this.page.waitForTimeout(500);
      }
      
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
    expect(page.url()).toMatch(/\/en\/$/);

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
    expect(page.url()).toMatch(/\/en\/$/);
    await helper.verifyEnglishContent();
    
    // Navigate to Dutch page
    await page.goto('/nl/');
    expect(page.url()).toMatch(/\/nl\/$/);
    await helper.verifyDutchContent();
    
    // Navigate back to English
    await page.goto('/en/');
    expect(page.url()).toMatch(/\/en\/$/);
    await helper.verifyEnglishContent();
  });
});