'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Truck, Zap, ShieldCheck, PackageCheck, RotateCcw, Clock, ArrowLeft, MapPin, CreditCard, HelpCircle } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';

export default function DeliveryPage() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const ka = language === 'ka';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t('common.back')}
      </Link>

      <h1 className="text-2xl font-bold text-text-primary mb-2">
        {ka ? 'მიწოდების დეტალები' : 'Delivery Details'}
      </h1>
      <p className="text-[14px] text-text-secondary mb-8">
        {ka
          ? 'გაეცანით მიწოდების მეთოდებს, წესებსა და პირობებს შეკვეთის გაფორმებამდე.'
          : 'Review delivery methods, terms, and conditions before placing your order.'}
      </p>

      {/* Delivery Methods */}
      <div className="space-y-4 mb-10">
        <h2 className="text-[15px] font-bold text-text-primary flex items-center gap-2">
          <Truck className="w-4.5 h-4.5 text-blue" />
          {ka ? 'მიტანის მეთოდები' : 'Delivery Methods'}
        </h2>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Standard */}
          <div className="p-5 border-b border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">
                    {ka ? 'სტანდარტული მიტანა' : 'Standard Delivery'}
                  </h3>
                  <span className="text-[14px] font-bold text-text-primary">3.00 ₾</span>
                </div>
                <ul className="space-y-1.5 mt-2">
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-blue mt-0.5">•</span>
                    {ka ? 'თბილისში მიტანა 1-3 სამუშაო დღეში' : 'Delivery in Tbilisi within 1-3 business days'}
                  </li>
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-blue mt-0.5">•</span>
                    {ka ? 'რეგიონებში მიტანა 3-5 სამუშაო დღეში' : 'Regional delivery within 3-5 business days'}
                  </li>
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-blue mt-0.5">•</span>
                    {ka ? 'კურიერი წინასწარ დაგიკავშირდებათ ტელეფონით' : 'The courier will contact you by phone in advance'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Express */}
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">
                    {ka ? 'ექსპრეს მიტანა' : 'Express Delivery'}
                  </h3>
                  <span className="text-[14px] font-bold text-text-primary">10.00 ₾</span>
                </div>
                <ul className="space-y-1.5 mt-2">
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {ka ? 'იმავე დღეს მიტანა — მხოლოდ თბილისში' : 'Same-day delivery — Tbilisi only'}
                  </li>
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {ka ? '20:00-მდე გაკეთებულ შეკვეთებზე ვრცელდება' : 'Available for orders placed before 8:00 PM'}
                  </li>
                  <li className="text-[12px] text-text-secondary flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {ka ? '20:00-ის შემდეგ შეკვეთა მეორე სამუშაო დღეს მიიტანება' : 'Orders after 8:00 PM will be delivered the next business day'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage */}
      <div className="space-y-4 mb-10">
        <h2 className="text-[15px] font-bold text-text-primary flex items-center gap-2">
          <MapPin className="w-4.5 h-4.5 text-blue" />
          {ka ? 'მიწოდების ზონა' : 'Delivery Coverage'}
        </h2>
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-[13px] text-text-secondary leading-relaxed">
            {ka
              ? 'მიწოდება ხორციელდება საქართველოს მთელ ტერიტორიაზე. ექსპრეს მიტანა ხელმისაწვდომია მხოლოდ თბილისის ფარგლებში. რეგიონებში მიტანა ხდება სტანდარტული სერვისით პარტნიორი საკურიერო კომპანიის მეშვეობით.'
              : 'We deliver across all of Georgia. Express delivery is available only within Tbilisi. Regional deliveries are handled via standard service through our partner courier company.'}
          </p>
        </div>
      </div>

      {/* Inspection & Returns */}
      <div className="space-y-4 mb-10">
        <h2 className="text-[15px] font-bold text-text-primary flex items-center gap-2">
          <PackageCheck className="w-4.5 h-4.5 text-blue" />
          {ka ? 'შემოწმება და დაბრუნება' : 'Inspection & Returns'}
        </h2>
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex gap-3 items-start">
            <PackageCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-semibold text-text-primary mb-1">
                {ka ? 'ადგილზე შემოწმება' : 'On-site Inspection'}
              </h4>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {ka
                  ? 'მყიდველი ვალდებულია ნივთის მიღებისას ადგილზე შეამოწმოს პროდუქტის მდგომარეობა, კომპლექტაცია და გარეგნული სახე. მიღების შემდეგ პრეტენზია გარეგნულ დაზიანებაზე არ მიიღება.'
                  : 'The buyer must inspect the product upon delivery — check its condition, completeness, and appearance. Claims for external damage will not be accepted after acceptance.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-semibold text-text-primary mb-1">
                {ka ? 'დაბრუნება / გადაცვლა' : 'Returns / Exchanges'}
              </h4>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {ka
                  ? 'ნივთის დაბრუნება ან გადაცვლა შესაძლებელია მხოლოდ 24 საათის განმავლობაში, თუ პროდუქტი არ არის გამოყენებული და შენარჩუნებულია ორიგინალი შეფუთვა. ნივთის დაბრუნების ტრანსპორტირების ხარჯი ეკისრება მყიდველს.'
                  : 'Returns or exchanges are accepted within 24 hours only if the product is unused and in its original packaging. Return shipping costs are covered by the buyer.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <ShieldCheck className="w-4 h-4 text-blue flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-semibold text-text-primary mb-1">
                {ka ? 'ფაბრიკული წუნი' : 'Factory Defects'}
              </h4>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {ka
                  ? 'ყველა პროდუქტი არის ორიგინალი და შემოწმებული ხარისხზე. ფაბრიკული წუნის აღმოჩენის შემთხვევაში ნივთის შეცვლა ხდება უფასოდ 7 დღის განმავლობაში.'
                  : 'All products are original and quality-checked. In case of a factory defect, free replacement is available within 7 days.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4 mb-10">
        <h2 className="text-[15px] font-bold text-text-primary flex items-center gap-2">
          <CreditCard className="w-4.5 h-4.5 text-blue" />
          {ka ? 'გადახდის მეთოდები' : 'Payment Methods'}
        </h2>
        <div className="bg-card border border-border rounded-2xl p-5">
          <ul className="space-y-2">
            <li className="text-[13px] text-text-secondary flex items-center gap-2">
              <span className="text-blue">•</span>
              {ka ? 'BOG iPay — ბანკის ბარათით ონლაინ გადახდა' : 'BOG iPay — Online card payment'}
            </li>
            <li className="text-[13px] text-text-secondary flex items-center gap-2">
              <span className="text-blue">•</span>
              {ka ? 'TBC Checkout — ბანკის ბარათით ონლაინ გადახდა' : 'TBC Checkout — Online card payment'}
            </li>
            <li className="text-[13px] text-text-secondary flex items-center gap-2">
              <span className="text-blue">•</span>
              {ka ? 'ნაღდი ანგარიშსწორება — გადახდა მიტანისას' : 'Cash on delivery — Pay upon delivery'}
            </li>
          </ul>
        </div>
      </div>

      {/* Working Hours & FAQ */}
      <div className="space-y-4 mb-10">
        <h2 className="text-[15px] font-bold text-text-primary flex items-center gap-2">
          <HelpCircle className="w-4.5 h-4.5 text-blue" />
          {ka ? 'ხშირად დასმული კითხვები' : 'FAQ'}
        </h2>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {[
            {
              q: { ka: 'რა საათებში მუშავდება შეკვეთები?', en: 'What are the order processing hours?' },
              a: { ka: 'შეკვეთები მუშავდება ყოველდღე 10:00-დან 19:00-მდე. კვირას და უქმე დღეებში შეკვეთები მუშავდება მომდევნო სამუშაო დღეს.', en: 'Orders are processed daily from 10:00 AM to 7:00 PM. Orders placed on Sundays and holidays are processed the next business day.' },
            },
            {
              q: { ka: 'შემიძლია მისამართის შეცვლა შეკვეთის შემდეგ?', en: 'Can I change the address after ordering?' },
              a: { ka: 'დიახ, თუ შეკვეთა ჯერ არ არის გაგზავნილი. დაგვიკავშირდით ტელეფონით რაც შეიძლება მალე.', en: 'Yes, if the order has not been shipped yet. Contact us by phone as soon as possible.' },
            },
            {
              q: { ka: 'რა ხდება თუ მიტანისას სახლში არ ვიქნები?', en: 'What happens if I\'m not home during delivery?' },
              a: { ka: 'კურიერი დაგიკავშირდებათ ტელეფონით. თუ ვერ მოხერხდა კავშირი, შეკვეთა მეორე დღეს მიიტანება.', en: 'The courier will contact you by phone. If they can\'t reach you, delivery will be attempted the next day.' },
            },
          ].map((item, i) => (
            <div key={i} className="p-5">
              <h4 className="text-[13px] font-semibold text-text-primary mb-1.5">{ka ? item.q.ka : item.q.en}</h4>
              <p className="text-[12px] text-text-secondary leading-relaxed">{ka ? item.a.ka : item.a.en}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: '✅', ka: 'ორიგინალი პროდუქცია', en: 'Original Products' },
          { icon: '💰', ka: 'საუკეთესო ფასები', en: 'Best Prices' },
          { icon: '🚚', ka: 'სწრაფი მიწოდება', en: 'Fast Delivery' },
          { icon: '🛡️', ka: 'ხარისხის გარანტია', en: 'Quality Guarantee' },
        ].map((item) => (
          <div key={item.en} className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
            <span className="text-base">{item.icon}</span>
            <span className="text-[12px] font-medium text-text-primary">{ka ? item.ka : item.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
