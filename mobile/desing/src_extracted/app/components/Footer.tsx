interface FooterProps {
  language: 'ka' | 'en';
}

export function Footer({ language }: FooterProps) {
  const t = {
    ka: {
      about: 'ჩვენ შესახებ',
      contact: 'კონტაქტი',
      terms: 'პირობები',
      privacy: 'კონფიდენციალურობა',
      payment: 'გადახდის მეთოდები',
      delivery: 'მიწოდება',
      returns: 'დაბრუნება',
      customerService: 'მომხმარებელთა მომსახურება',
      followUs: 'გამოგვყევით',
      copyright: '© 2026 AutoParts. ყველა უფლება დაცულია.',
    },
    en: {
      about: 'About Us',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy',
      payment: 'Payment Methods',
      delivery: 'Delivery',
      returns: 'Returns',
      customerService: 'Customer Service',
      followUs: 'Follow Us',
      copyright: '© 2026 AutoParts. All rights reserved.',
    },
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground">🚗</span>
              </div>
              <span className="font-semibold">AutoParts</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'ka'
                ? 'მანქანის აქსესუარების ონლაინ მაღაზია საუკეთესო ფასებით'
                : 'Online car accessories store with the best prices'}
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">{t[language].customerService}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].about}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].contact}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].delivery}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].returns}</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'ka' ? 'ინფორმაცია' : 'Information'}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].payment}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].terms}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t[language].privacy}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">{t[language].followUs}</h3>
            <div className="flex gap-3">
              <a href="#" className="size-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <span>📘</span>
              </a>
              <a href="#" className="size-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <span>📷</span>
              </a>
              <a href="#" className="size-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                <span>✉️</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          {t[language].copyright}
        </div>
      </div>
    </footer>
  );
}
