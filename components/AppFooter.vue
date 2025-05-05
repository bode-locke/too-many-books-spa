<template>
  <footer class="bg-background dark:bg-dark-background border-t border-secondary dark:border-dark-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <h3 class="text-sm font-semibold text-text dark:text-dark-text tracking-wider uppercase">
            {{ $t('footer.product') }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.features') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.pricing') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.updates') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <h3 class="text-sm font-semibold text-text dark:text-dark-text tracking-wider uppercase">
            {{ $t('footer.legal') }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.privacy') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.terms') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.cookies') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <h3 class="text-sm font-semibold text-text dark:text-dark-text tracking-wider uppercase">
            {{ $t('footer.contact') }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.support') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.contact') }}
              </a>
            </li>
            <li>
              <a href="#" class="text-base text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary">
                {{ $t('footer.status') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-secondary dark:border-dark-secondary pt-8">
        <p class="text-base text-text/70 dark:text-dark-text/70 text-center">
          &copy; {{ new Date().getFullYear() }} TooManyBooks. {{ $t('footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template> 