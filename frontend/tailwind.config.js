/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // ใช้ Prompt (อ่านไทยสวย)
        sans: ['var(--font-prompt)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          50:  '#eef6ff',
          100: '#daeefe',
          200: '#b7dcfd',
          300: '#8ac3fb',
          400: '#5aa6f7',
          500: '#2f86f1',     // Primary
          600: '#1f6ddc',
          700: '#1c59b4',
          800: '#1a4a90',
          900: '#193f76',
        },
        ink: '#0f172a',       // ตัวหนังสือ
        soft: '#f8fafc',      // พื้นหลังนุ่ม
      },
      boxShadow: {
        card: '0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
