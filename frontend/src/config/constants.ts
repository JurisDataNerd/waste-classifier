import type { Category, Feature } from '@/types/classifier'

export const CATEGORIES: Category[] = [
  { id: 'plastic_bottle', icon: '\u{1F9F4}', label: 'Plastic Bottle' },
  { id: 'carton_brick', icon: '\u{1F9C3}', label: 'Carton Brick' },
  { id: 'metal_packaging', icon: '\u{1F96B}', label: 'Metal' },
  { id: 'household_waste', icon: '\u{1F5D1}', label: 'Household' },
  { id: 'paper_cardboard', icon: '\u{1F4E6}', label: 'Paper' },
  { id: 'glass', icon: '\u{1F377}', label: 'Glass' },
]

export const LABELS: Record<string, string> = {
  plastic_bottle: 'Botol Plastik',
  carton_brick: 'Karton / Tetra Pak',
  metal_packaging: 'Kemasan Logam',
  household_waste: 'Sampah Rumah Tangga',
  paper_cardboard: 'Kertas & Kardus',
  glass: 'Kaca',
}

export const ICONS: Record<string, string> = {
  plastic_bottle: '\u{1F9F4}',
  carton_brick: '\u{1F9C3}',
  metal_packaging: '\u{1F96B}',
  household_waste: '\u{1F5D1}',
  paper_cardboard: '\u{1F4E6}',
  glass: '\u{1F377}',
}

export const FEATURES: Feature[] = [
  {
    icon: '\u{1F9EC}',
    iconColor: 'green',
    title: 'AI-Powered',
    description:
      'Transfer learning dari ResNet18 yang telah di-training pada dataset ImageNet untuk akurasi tinggi.',
  },
  {
    icon: '\u{1F5D1}',
    iconColor: 'blue',
    title: '6 Kategori Sampah',
    description:
      'Mengklasifikasikan sampah ke dalam botol plastik, karton, logam, rumah tangga, kertas, dan kaca.',
  },
  {
    icon: '\u26A1',
    iconColor: 'purple',
    title: 'Real-time',
    description:
      'Prediksi instan melalui REST API. Upload gambar dan dapatkan hasil dalam hitungan detik.',
  },
]
