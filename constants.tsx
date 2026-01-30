import { Service, NavLink, BlogPost, Review } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'الرئيسية', path: '/' },
  { label: 'عن الدكتور', path: '/about' },
  { label: 'التخصصات', path: '/services' },
  { label: 'المدونة الطبية', path: '/blog' },
  { label: 'شهادات المرضى', path: '/testimonials' },
  { label: 'احجز الآن', path: '/booking' },
];

export const DOCTOR_NAME = "أ.د. أشرف العزب";
export const DOCTOR_SLOGAN = "التخصص الدقيق يختصر الطريق";
export const TRUST_MESSAGE = "ثقتكم أغلى ما نسعى إليه";

export const DOCTOR_IMAGE_URL = "./dr-ashraf.jpg"; 

export const PHONE_CAIRO = "01027470066";
export const PHONE_SENBELLAWEIN = "01212585052";
export const PHONE_MANSOURA = "01277048240";
export const CLINIC_PHONE = PHONE_CAIRO;

export const ACADEMIC_CREDENTIALS = [
  {
    title: "الدكتوراة",
    degree: "دكتوراة جراحة العظام والمناظير - جامعة القاهرة",
    description: "أعلى درجة علمية وأكاديمية متخصصة في جراحة العظام من أعرق الجامعات المصرية.",
    icon: "🎓",
    type: "phd"
  },
  {
    title: "البورد الأوروبي",
    degree: "زميل المجلس الأوروبي لجراحة العظام والكسور (EBOT)",
    description: "أرفع شهادة مهنية دولية في جراحة العظام على مستوى دول الاتحاد الأوروبي.",
    icon: "🇪🇺",
    type: "board"
  }
];

export const ACADEMIC_STATS = [
  { label: "بحث دولي منشور", value: "40+", icon: "🔬" },
  { label: "استشهاد علمي", value: "300+", icon: "📚" },
  { label: "سنوات خبرة", value: "20+", icon: "👨‍⚕️" }
];

export const RESEARCH_INFO = [
  "أكثر من 40 بحثاً علمياً منشوراً في أرقى المجلات الطبية الدولية.",
  "محرر علمي معتمد في المجلات التخصصية لجراحة العظام.",
  "مراجع ومحكم دولي للأبحاث المقدمة في المؤتمرات العالمية.",
  "خبير معتمد في أبحاث الطب التجديدي واستخدامات البلازما الغنية بالصفائح."
];

export const FELLOWSHIPS_DETAILED = [
  {
    title: "زمالة جراحة الركبة والمناظير",
    details: "تدريب متطور في ألمانيا على أحدث تقنيات مناظير المفاصل وإعادة بناء الأربطة.",
    country: "ألمانيا",
    icon: "🇩🇪"
  },
  {
    title: "زمالة جراحات استبدال المفاصل",
    details: "تخصص دقيق في جراحات المفاصل الصناعية المعقدة في سويسرا.",
    country: "سويسرا",
    icon: "🇨🇭"
  },
  {
    title: "زمالة جراحة الكتف والطرف العلوي",
    details: "خبرة متقدمة في مناظير الكتف وإصابات الملاعب في كوريا الجنوبية.",
    country: "كوريا الجنوبية",
    icon: "🇰🇷"
  }
];

export const INTERNATIONAL_MEMBERSHIPS = [
  { title: "عضو الجمعية السويسرية لجراحة العظام (AO Foundation)", code: "AO" },
  { title: "عضو الجمعية الدولية لجراحة الركبة والمناظير (ISAKOS)", code: "ISAKOS" },
  { title: "زميل المجلس الأوروبي لجراحة العظام والكسور (EBOT)", code: "EBOT" },
  { title: "الجمعية الأوروبية لإصابات الملاعب (ESSKA)", code: "ESSKA" },
  { title: "الجمعية المصرية لجراحة العظام (EOA)", code: "EOA" },
  { title: "الجمعية السعودية لجراحة العظام", code: "SOA" },
  { title: "الجمعية الأمريكية لجراحة العظام (AAOS)", code: "AAOS" },
  { title: "الجمعية العربية لجراحة العظام", code: "AOA" },
  { title: "الجمعية الدولية لجراحة مناظير المفاصل (IAS)", code: "IAS" },
  { title: "الجمعية الألمانية لجراحة العظام (DGOOC)", code: "DGOOC" }
];

export const FACEBOOK_URL = "https://www.facebook.com/share/17noeYo9QP/?mibextid=wwXIfr";
export const YOUTUBE_URL = "https://www.youtube.com/@montocristo2003";
export const TIKTOK_URL = "https://www.tiktok.com/@dr.ashraf.elazab";
export const INSTAGRAM_URL = "https://www.instagram.com/dr.ashraf.elazab";
export const WHATSAPP_URL = `https://wa.me/2${PHONE_CAIRO}`;

export const INSTAPAY_INFO = "ashraf.elazab@instapay";
export const INSTAPAY_QR_CODE =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ashraf.elazab@instapay";
export const DOCTOR_IMAGE_URL = "/dr-ashraf.jpg";

export const SURGICAL_SERVICES = [
  {
    title: "جراحات الركبة",
    description: "جراحات متقدمة لاستبدال المفاصل وإصلاح الأربطة",
    icon: "🦵"
  },
  {
    title: "جراحات الكتف",
    description: "مناظير الكتف وإصلاح أوتار الكتف",
    icon: "💪"
  },
  {
    title: "جراحات العمود الفقري",
    description: "تشخيص وعلاج آلام العمود الفقري والانزلاق الغضروفي",
    icon: "🦴"
  }
];

export const NON_SURGICAL_SERVICES = [
  {
    title: "الحقن الموضعي",
    description: "حقن البلازما والكورتيزون داخل المفاصل",
    icon: "💉"
  },
  {
    title: "العلاج التحفظي",
    description: "برامج علاج بدون جراحة",
    icon: "🩺"
  }
];

