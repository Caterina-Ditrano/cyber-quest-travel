import stageAirportWifi from "@/assets/stage-airport-wifi.jpg";
import stageHotel from "@/assets/stage-hotel.jpg";
import stageUsb from "@/assets/stage-usb.jpg";
import stageEmail from "@/assets/stage-email.jpg";
import stageCafe from "@/assets/stage-cafe.jpg";
import stageSms from "@/assets/stage-sms.jpg";
import stagePrinter from "@/assets/stage-printer.jpg";
import stageStranger from "@/assets/stage-stranger.jpg";
import type { Decision } from "./gameData";

export const decisionsEn: Decision[] = [
  {
    id: 1,
    background: stageAirportWifi,
    scenario: "Martín has just arrived at the airport and has a 2-hour wait before his flight. He needs to review some important work documents.",
    location: "🛫 International Airport",
    question: "Which WiFi network should Martín connect to?",
    options: [
      {
        text: "Connect to 'AIRPORT_FREE_WIFI' (open network with no password)",
        isCorrect: false,
        consequence: "❌ Bad decision! Public WiFi networks without a password are extremely vulnerable. An attacker could intercept all of Martín's traffic, including credentials and confidential documents. Hackers frequently create fake networks with names similar to official ones.",
      },
      {
        text: "Use his phone's mobile data as a personal hotspot",
        isCorrect: true,
        consequence: "✅ Excellent decision! Using your own mobile data is much safer than connecting to public WiFi networks. The traffic is encrypted and can't easily be intercepted by third parties.",
      },
      {
        text: "Connect to 'AIRPORT_OFFICIAL_WIFI', which requires a password printed on a sign in the lobby",
        isCorrect: false,
        consequence: "❌ Careful! Having a password doesn't make it secure: anyone who sees the sign can join, and attackers often set up 'evil twin' networks with official-sounding names to intercept your traffic. A shared password doesn't encrypt your session from other users on that same network.",
      },
    ],
    tip: "Always prioritize using your mobile data or a corporate VPN over public WiFi networks.",
  },
  {
    id: 2,
    background: stageHotel,
    scenario: "Martín arrives at the hotel in {destination}. At the front desk, they ask for his details to check in and offer a 'convenient' option to guarantee the reservation.",
    location: "🏨 Hotel in {destination}",
    question: "The receptionist asks him to send a photo of his credit card via WhatsApp to 'speed up the process'. What should he do?",
    options: [
      {
        text: "Send the photo via WhatsApp as requested, it's faster",
        isCorrect: false,
        consequence: "❌ Critical mistake! Never send photos of credit cards through messaging apps. This information could be intercepted, stored indefinitely, or used for fraud. WhatsApp is not a secure channel for financial data, and the employee could misuse this information maliciously.",
      },
      {
        text: "Refuse and provide the card only in person at the official payment terminal",
        isCorrect: true,
        consequence: "✅ Correct! Always provide card details only at official, secure payment terminals. No legitimate establishment should ask you to send photos of your cards via messaging.",
      },
      {
        text: "Quietly dictate the number, expiration date, and CVV to the receptionist so he can charge it",
        isCorrect: false,
        consequence: "❌ Just as risky! Verbally sharing all your card details (including the CVV) lets the employee write them down or memorize them for later use. Plus, other guests at the front desk could overhear. Full card details should only be entered by you at a POS terminal or an official HTTPS site.",
      },
    ],
    tip: "Card details should only be entered at official POS terminals or websites with verified HTTPS.",
  },
  {
    id: 3,
    background: stageUsb,
    scenario: "In the hotel room, Martín needs to charge his phone but forgot his charger. He finds a USB cable on the hotel desk.",
    location: "🛏️ Hotel Room",
    question: "Should he use the hotel's USB cable to charge his phone?",
    options: [
      {
        text: "Yes, it's just a charging cable, there's no risk",
        isCorrect: false,
        consequence: "❌ Careful! USB cables can be modified to steal data (juice jacking). A malicious cable can transfer malware to your device or copy information while it 'charges'. This type of attack is increasingly common in public places.",
      },
      {
        text: "No, better to find a wall outlet and use only his own adapter",
        isCorrect: true,
        consequence: "✅ Good thinking! Always use your own cables and chargers. 'Juice jacking' is a real attack where malicious USB cables can steal data or install malware.",
      },
      {
        text: "Use it just for charging, making sure to tap 'Charge only' when the phone asks",
        isCorrect: false,
        consequence: "❌ Not enough! A tampered cable like an O.MG Cable can ignore the 'Charge only' prompt and inject commands as if it were a USB keyboard (HID attack). The operating system's popup doesn't protect against malicious hardware cables. The only real defense is using your own cables or a USB data blocker.",
      },
    ],
    tip: "Always carry your own cables and consider using a USB data blocker when traveling.",
  },
  {
    id: 4,
    background: stageEmail,
    scenario: "Martín receives an 'urgent' email from his boss asking him to transfer confidential information to a new email address.",
    location: "📧 Checking Emails",
    question: "The email says: 'Martín, I urgently need you to send me the VIP customer file at my personal email boss.personal@gmail.com. It's very urgent, I can't access the corporate account.' What does he do?",
    options: [
      {
        text: "Send the information immediately, the boss urgently needs it",
        isCorrect: false,
        consequence: "❌ You've fallen for a phishing/spear phishing attack! Attackers research a company's structure and craft convincing emails impersonating superiors. Never send sensitive information based only on an urgent email.",
      },
      {
        text: "Call his boss directly by phone to verify the request",
        isCorrect: true,
        consequence: "✅ Excellent judgment! Always verify unusual requests through a different channel. A phone call can prevent a social engineering attack that could cost the company millions.",
      },
      {
        text: "Reply to the email asking the same sender to confirm before sending the file",
        isCorrect: false,
        consequence: "❌ Classic trap! If the email is spoofed or the boss's account was compromised, the attacker will reply 'yes, send it' from the same address. Verifying through the same suspicious channel provides no real security. Always use an alternative channel (call, Teams, in person).",
      },
    ],
    tip: "For urgent requests involving sensitive information, always verify through another channel (call, video call).",
  },
  {
    id: 5,
    background: stageCafe,
    scenario: "At the hotel café, Martín needs to work on an important presentation. The place is crowded.",
    location: "☕ Hotel Café",
    question: "Martín needs to log into sensitive corporate systems. How should he proceed?",
    options: [
      {
        text: "Work normally, no one is paying attention",
        isCorrect: false,
        consequence: "❌ Risk of shoulder surfing! In public places, malicious people can watch your screen and keyboard to steal passwords and confidential information. This is one of the simplest yet most effective methods of information theft.",
      },
      {
        text: "Use a privacy screen filter and sit with his back to the wall",
        isCorrect: true,
        consequence: "✅ Very aware! Privacy filters prevent others from seeing your screen from side angles. Positioning yourself strategically reduces the risk of others observing your activities.",
      },
      {
        text: "Connect the laptop to the café's WiFi and use incognito mode to 'leave no trace'",
        isCorrect: false,
        consequence: "❌ Incognito mode ≠ security! Incognito only prevents your history from being saved locally; it doesn't encrypt your traffic or protect you from shoulder surfing, public WiFi, or a keylogger. Anyone behind you still sees everything, and the network can still intercept what you type.",
      },
    ],
    tip: "Invest in a privacy filter for your laptop. It costs little and protects a lot.",
  },
  {
    id: 6,
    background: stageSms,
    scenario: "Martín receives a text message from his 'bank' warning of suspicious activity on his account and asking him to click a link.",
    location: "📱 Text Message",
    question: "The SMS reads: 'BANK ALERT: We detected unusual activity. Verify your account immediately: http://bank-verify.tk/secure'. What does Martín do?",
    options: [
      {
        text: "Click the link to verify that everything is fine with his account",
        isCorrect: false,
        consequence: "❌ It's a smishing attack (phishing via SMS)! The link leads to a fake site that will steal your banking credentials. Legitimate banks never send links via SMS asking you to enter your data.",
      },
      {
        text: "Ignore the SMS and open the bank's official app directly to check",
        isCorrect: true,
        consequence: "✅ Perfect! Always access banking services directly through the official app or by typing the URL into your browser. Never click links in SMS messages or emails.",
      },
      {
        text: "Call the phone number listed in the same SMS to speak with the bank",
        isCorrect: false,
        consequence: "❌ Trap! Attackers put their own numbers in the SMS (vishing). You'll end up talking to the scammer, who will ask you to 'verify your identity' by dictating data, passwords, or SMS codes. If you want to call the bank, use only the official number on the back of your card or in the app.",
      },
    ],
    tip: "Legitimate banks never ask for sensitive data via SMS. If in doubt, contact the bank directly.",
  },
  {
    id: 7,
    background: stagePrinter,
    scenario: "At the {destination} airport, Martín needs to print some urgent documents for a meeting. He finds a public printing kiosk.",
    location: "🖨️ {destination} Airport",
    question: "Martín needs to print confidential company documents. What should he do?",
    options: [
      {
        text: "Use the public kiosk, it's an emergency",
        isCorrect: false,
        consequence: "❌ Public kiosks are risky! They can store copies of your documents, have malware installed, or allow others to access your files. Confidential documents should never be printed on uncontrolled equipment.",
      },
      {
        text: "Look for an airport business center or wait until reaching the client's office",
        isCorrect: true,
        consequence: "✅ Prudent decision! Business centers offer greater security, or better yet, wait to use trusted equipment. Urgency doesn't justify compromising confidential information.",
      },
      {
        text: "Plug his own USB drive into the kiosk, print, and then delete the files from the kiosk",
        isCorrect: false,
        consequence: "❌ Not enough! Kiosks can have malware that infects your USB drive as soon as you connect it, and many keep cached copies or print queues that a simple 'delete' doesn't remove. Plus, you exposed confidential documents on equipment not controlled by the company.",
      },
    ],
    tip: "Plan ahead for printing needs. Avoid public kiosks for sensitive documents.",
  },
  {
    id: 8,
    background: stageStranger,
    scenario: "Last day of the trip. Martín is at the {destination} airport waiting for his return flight. A friendly person asks him to watch their laptop for a moment while they go to the restroom.",
    location: "🛫 {destination} Airport",
    question: "A professional-looking traveler tells him: 'Excuse me, could you watch my laptop for a moment? I'm just going to the restroom.' What does Martín do?",
    options: [
      {
        text: "Kindly agree, they seem trustworthy",
        isCorrect: false,
        consequence: "❌ This could be a trap! It's a social engineering technique. The person could accuse you of theft, or the laptop could contain illegal material. It also distracts your attention from your own devices, which could be stolen.",
      },
      {
        text: "Politely decline and suggest they use a luggage locker",
        isCorrect: true,
        consequence: "✅ Well done! Never take responsibility for other people's equipment. It's a known distraction technique, or even a way to implicate you in compromising situations. Protect your own devices at all times.",
      },
      {
        text: "Agree, but take a photo of the person and the laptop first 'just in case'",
        isCorrect: false,
        consequence: "❌ Still a bad idea! A photo doesn't legally protect you if the laptop contains illegal material or if you're accused of tampering with it, and it doesn't stop your own belongings from being stolen while you watch someone else's. The rule is: don't take charge of strangers' devices, period.",
      },
    ],
    tip: "While traveling, always keep your devices with you. Don't get distracted by strangers' requests.",
  },
];
