import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('should switch between English and Dutch languages', async ({ page }) => {
    // Navigate to the root page (English)
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check if we're on mobile or desktop
    // Check if we're on mobile or desktop by checking viewport width
    const viewportWidth = page.viewportSize()?.width || 1200;
    const isMobile = viewportWidth < 1024;
    
    if (isMobile) {
      // Mobile: Open hamburger menu first
      await page.locator('div.fixed.top-0.left-0.right-0 button').click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("About")')).toBeVisible();
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("Projects")')).toBeVisible();
      // Close menu
      await page.locator('div.fixed.top-0.left-0.right-0 button').click();
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'hidden' });
    } else {
      // Desktop: Check navigation is visible (desktop header has different CSS classes)
      await expect(page.locator('header.fixed nav button:has-text("About")')).toBeVisible();
      await expect(page.locator('header.fixed nav button:has-text("Projects")')).toBeVisible();
    }

    // Verify we're on the English page (root URL)
    expect(page.url()).toBe('http://localhost:3000/');

    // Click on the NL language switcher
    if (isMobile) {
      // Mobile: Open hamburger menu first
      await page.locator('button:has(svg)').first().click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      // Wait for language switcher to be visible and then click it
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40 a[href="/nl/"]', { state: 'visible', timeout: 15000 });
      await page.locator('div.fixed.inset-0.bg-gray-900.z-40 a[href="/nl/"]').click();
    } else {
      const nlLink = page.locator('a[href="/nl/"]').first();
      await nlLink.click();
    }

    // Wait for navigation
    await page.waitForURL('/nl/');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for mobile menu to close after navigation
    if (isMobile) {
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'hidden', timeout: 5000 });
    }

    // Verify Dutch content is displayed (using About section subtitle which is always visible)
    await expect(page.locator('text=Coaching in zwemmen, triathlon en duursporten')).toBeVisible();
    
    if (isMobile) {
      // Mobile: Open hamburger menu to check Dutch navigation
      await page.locator('div.fixed.top-0.left-0.right-0 button').click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("Info")')).toBeVisible();
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("Projecten")')).toBeVisible();
      // Close menu
      await page.locator('div.fixed.top-0.left-0.right-0 button').click();
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'hidden' });
    } else {
      // Desktop: Check Dutch navigation is visible (desktop header has different CSS classes)
      await expect(page.locator('header.fixed nav button:has-text("Info")')).toBeVisible();
      await expect(page.locator('header.fixed nav button:has-text("Projecten")')).toBeVisible();
    }

    // Click on the EN language switcher to go back
    if (isMobile) {
      // Mobile: Open hamburger menu first
      await page.locator('button:has(svg)').first().click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      // Wait for language switcher to be visible and then click it
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40 a[href="/"]', { state: 'visible', timeout: 15000 });
      await page.locator('div.fixed.inset-0.bg-gray-900.z-40 a[href="/"]').click();
    } else {
      const enLink = page.locator('a[href="/"]').first();
      await enLink.click();
    }

    // Wait for navigation
    await page.waitForURL('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for mobile menu to close after navigation
    if (isMobile) {
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'hidden', timeout: 5000 });
    }

    // Verify English content is restored
    if (isMobile) {
      // On mobile, verify the name in the fixed header bar (use more specific selector)
      await expect(page.locator('div.fixed.top-0.left-0.right-0 div.text-white.font-bold:has-text("Ward Pellegrims")')).toBeVisible();
    } else {
      // On desktop, verify English content is restored
      await expect(page.locator('text=Swimming & Triathlon Coach')).toBeVisible();
    }
    
    if (isMobile) {
      // Mobile: Open hamburger menu to verify English navigation is back
      await page.locator('div.fixed.top-0.left-0.right-0 button').click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("About")')).toBeVisible();
      await expect(page.locator('div.fixed.inset-0.bg-gray-900.z-40 nav button:has-text("Projects")')).toBeVisible();
    } else {
      // Desktop: Check English navigation is visible (desktop header has different CSS classes)
      await expect(page.locator('header.fixed nav button:has-text("About")')).toBeVisible();
      await expect(page.locator('header.fixed nav button:has-text("Projects")')).toBeVisible();
    }
  });


  test('should display different content for different languages', async ({ page }) => {
    // Test English content
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Verify English about content
    await expect(page.locator('text=Improve your swimming, cycling and running performance')).toBeVisible();
    
    // Verify English contact content  
    await expect(page.locator('h3:has-text("Contact Me")')).toBeVisible();
    await expect(page.locator('text=Feel free to contact me')).toBeVisible();

    // Check if we're on mobile or desktop
    // Check if we're on mobile or desktop by checking viewport width
    const viewportWidth = page.viewportSize()?.width || 1200;
    const isMobile = viewportWidth < 1024;
    
    if (isMobile) {
      // Mobile: Open hamburger menu to access language switcher
      await page.locator('button:has(svg)').first().click();
      // Wait for mobile menu overlay to be visible
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40', { state: 'visible' });
      // Wait for language switcher to be visible and then click it
      await page.waitForSelector('div.fixed.inset-0.bg-gray-900.z-40 a[href="/nl/"]', { state: 'visible', timeout: 15000 });
      await page.locator('div.fixed.inset-0.bg-gray-900.z-40 a[href="/nl/"]').click();
    } else {
      // Desktop: Click language switcher directly
      await page.locator('a[href="/nl/"]').first().click();
    }
    
    await page.waitForURL('/nl/');
    await page.waitForLoadState('domcontentloaded');

    // Verify Dutch about content
    await expect(page.locator('text=Coaching in zwemmen, triathlon en duursporten')).toBeVisible();
    
    // Verify Dutch contact content
    await expect(page.locator('h3:has-text("Contacteer mij")')).toBeVisible();
    await expect(page.locator('text=Contacteer me vrijblijvend')).toBeVisible();
  });

  test('should have correct URLs for both languages', async ({ page }) => {
    // Navigate to English page
    await page.goto('/');
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Check if we're on mobile or desktop to determine content visibility
    // Check if we're on mobile or desktop by checking viewport width
    const viewportWidth = page.viewportSize()?.width || 1200;
    const isMobile = viewportWidth < 1024;
    
    // Verify English content is displayed
    if (isMobile) {
      // On mobile, verify the name in the fixed header bar (use more specific selector)
      await expect(page.locator('div.fixed.top-0.left-0.right-0 div.text-white.font-bold:has-text("Ward Pellegrims")')).toBeVisible();
    } else {
      // On desktop, verify the subtitle is visible
      await expect(page.locator('text=Swimming & Triathlon Coach')).toBeVisible();
    }
    
    if (isMobile) {
      // On mobile, verify the name in the fixed header bar is visible (use more specific selector)
      await expect(page.locator('div.fixed.top-0.left-0.right-0 div.text-white.font-bold:has-text("Ward Pellegrims")')).toBeVisible();
    } else {
      // On desktop, verify English content loads
      await expect(page.locator('text=Swimming & Triathlon Coach')).toBeVisible();
    }
    
    // Check that we can navigate to Dutch page
    await page.goto('/nl/');
    expect(page.url()).toBe('http://localhost:3000/nl/');
    
    // Verify Dutch content loads (using About section subtitle which is always visible)
    await expect(page.locator('text=Coaching in zwemmen, triathlon en duursporten')).toBeVisible();
    
    // Navigate back to English
    await page.goto('/');
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Verify English content loads
    if (isMobile) {
      // On mobile, verify the name in the fixed header bar is visible (use more specific selector)
      await expect(page.locator('div.fixed.top-0.left-0.right-0 div.text-white.font-bold:has-text("Ward Pellegrims")')).toBeVisible();
    } else {
      await expect(page.locator('text=Swimming & Triathlon Coach')).toBeVisible();
    }
  });
});