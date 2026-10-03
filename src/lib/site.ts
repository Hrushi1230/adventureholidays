// Editable site content. Replace placeholders when the client supplies real details.
import hero from "@/assets/hero.jpg";
import kerala from "@/assets/kerala.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import rafting from "@/assets/rafting.jpg";
import goa from "@/assets/goa.jpg";
import odisha from "@/assets/odisha.jpg";
import kashmir from "@/assets/kashmir.jpg";
import northeast from "@/assets/northeast.jpg";

export const images = { hero, kerala, rajasthan, rafting, goa, odisha, kashmir, northeast };

export const contact = {
  phone: "+91 00000 00000", // placeholder
  phoneHref: "tel:+910000000000",
  whatsappHref: "https://wa.me/910000000000", // placeholder
  email: "hello@yourdomain.com", // placeholder
  address: "Your office address, City, State", // placeholder
  socials: { instagram: "#", facebook: "#", youtube: "#", whatsapp: "#" },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Tours", href: "#tours" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const tours = [
  { title: "Adventure Tours", place: "Himalayas & Rivers", text: "Rafting, treks and high trails for travellers who want their pulse to rise.", img: rafting, w: 1280, h: 960 },
  { title: "Couple Getaways", place: "Coast & Hills", text: "Slow sunsets, quiet beaches and time that belongs to just the two of you.", img: goa, w: 1280, h: 960 },
  { title: "Family Holidays", place: "Nature trails", text: "Easy-paced journeys with something wonderful for every age.", img: northeast, w: 1024, h: 1280 },
  { title: "Cultural Journeys", place: "Heritage India", text: "Temples, forts and living traditions told through the places themselves.", img: odisha, w: 1024, h: 1280 },
  { title: "Group Tours", place: "Desert & Forts", text: "Shared roads, campfire evenings and stories you'll retell for years.", img: rajasthan, w: 1280, h: 960 },
];

export const destinations = [
  { name: "Kashmir", text: "Mist on still lakes and snow on every horizon.", img: kashmir, span: "md:col-span-7 md:row-span-2" },
  { name: "Kerala", text: "Backwaters, palms and an unhurried rhythm.", img: kerala, span: "md:col-span-5 md:row-span-2" },
  { name: "Rajasthan", text: "Golden forts and desert evenings.", img: rajasthan, span: "md:col-span-4" },
  { name: "Odisha", text: "Stone-carved heritage beside the sea.", img: odisha, span: "md:col-span-4" },
  { name: "Goa", text: "Warm sand and long coastal sunsets.", img: goa, span: "md:col-span-4" },
  { name: "North East India", text: "Living root bridges and cloud forests.", img: northeast, span: "md:col-span-5" },
  { name: "Himachal Pradesh", text: "Pine valleys and mountain passes.", img: hero, span: "md:col-span-7" },
];

export const gallery = [
  { src: hero, alt: "Trekkers watching sunrise over Himalayan peaks", cls: "md:col-span-2 md:row-span-2" },
  { src: kerala, alt: "Houseboat on Kerala backwaters", cls: "md:row-span-2" },
  { src: rafting, alt: "Friends white water rafting", cls: "" },
  { src: kashmir, alt: "Shikara boat on Dal Lake, Kashmir", cls: "" },
  { src: odisha, alt: "Carved chariot wheel, Konark Sun Temple", cls: "md:row-span-2" },
  { src: goa, alt: "Couple walking on a Goa beach at sunset", cls: "md:col-span-2" },
  { src: northeast, alt: "Family crossing a living root bridge in Meghalaya", cls: "md:row-span-2" },
  { src: rajasthan, alt: "Camel caravan near a Rajasthan fort", cls: "md:col-span-2" },
];
