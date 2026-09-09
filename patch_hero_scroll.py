with open('src/components/sections/CertificateHeroScroll.tsx', 'r') as f:
    content = f.read()

import re

old_pool = """const CERTIFICATE_POOL = [
    "Data Analytics on Google Cloud.webp",
    "Deep Learning Beginner.webp",
    "Docker, Kubernetes dan DevOps.webp",
    "Fullstack Programming Untuk Pemula.webp",
    "Introduction to Generative AI.webp",
    "Machine Learning Foundations.webp",
    "Mastering Smart Contract.webp",
    "Started with Databases.webp",
    "Supervised Machine Learning Regression and Classification.webp",
    "elevAIte with Dicoding Program 2025.webp"
];"""

new_pool = """const CERTIFICATE_POOL = [
    "vishnu-cert-1.jpg",
    "vishnu-cert-2.jpg",
    "vishnu-cert-3.jpg",
    "vishnu-cert-4.jpg",
    "vishnu-cert-5.jpg",
    "vishnu-cert-6.jpg"
];"""

content = content.replace(old_pool, new_pool)
content = content.replace('src: `/certificate/${filename}`', 'src: `/certificates/${filename}`')

with open('src/components/sections/CertificateHeroScroll.tsx', 'w') as f:
    f.write(content)
