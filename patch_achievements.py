import re

with open('src/data/portfolio.ts', 'r') as f:
    content = f.read()

old_achievements = """    achievements: [
        {
            id: 'openssf-gold-zk',
            title: 'OpenSSF GOLD 300% - zk-proof-engine',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504'
        },
        {
            id: 'openssf-gold-pywaf',
            title: 'OpenSSF GOLD 300% - PyWAF',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504'
        },
        {
            id: 'openssf-silver-qsf',
            title: 'OpenSSF SILVER 283% - Quantum-Security-Fabric',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504'
        }
    ],"""

new_achievements = """    achievements: [
        {
            id: 'openssf-gold-zk',
            title: 'OpenSSF GOLD 300% - zk-proof-engine',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-1.jpg'
        },
        {
            id: 'openssf-gold-pywaf',
            title: 'OpenSSF GOLD 300% - PyWAF',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-2.jpg'
        },
        {
            id: 'openssf-silver-qsf',
            title: 'OpenSSF SILVER 283% - Quantum-Security-Fabric',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-3.jpg'
        },
        {
            id: 'toptal-sde',
            title: 'Toptal Verified SDE/ML Engineer (Top 3%)',
            issuer: 'Toptal',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.toptal.com',
            image: '/certificates/vishnu-cert-4.jpg'
        },
        {
            id: 'microsoft-ai',
            title: 'Microsoft AI Cloud Certified',
            issuer: 'Microsoft',
            date: '2025',
            category: 'certification',
            credentialUrl: 'https://microsoft.com',
            image: '/certificates/vishnu-cert-5.jpg'
        },
        {
            id: 'cybersecurity-vapt',
            title: 'Advanced Web & Linux VAPT',
            issuer: 'IIIT Allahabad',
            date: '2024',
            category: 'certification',
            credentialUrl: 'https://iiita.ac.in',
            image: '/certificates/vishnu-cert-6.jpg'
        }
    ],"""

if old_achievements in content:
    content = content.replace(old_achievements, new_achievements)
else:
    print("Could not find old achievements string")

with open('src/data/portfolio.ts', 'w') as f:
    f.write(content)
