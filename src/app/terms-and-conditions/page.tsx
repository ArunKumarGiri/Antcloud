import React, { useRef } from "react"
import { Link } from "react-router-dom"

export default function TnC() {
    return (
        <>
            <section className="min-h-screen py-8 sm:py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col items-center">
                        <div className="w-full text-center mb-8 sm:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] bg-clip-text text-transparent">
                                Terms And Conditions
                            </h2>
                            <div className="w-[15rem] sm:w-[24rem] h-1 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] mx-auto mt-3 sm:mt-4 rounded-full"></div>
                        </div>
                        <div className="w-full max-w-4xl">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] rounded-xl sm:rounded-2xl blur opacity-30"></div>
                                <div className="relative bg-white/80 dark:bg-black/70 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-xl">
                                    <div className="space-y-6 sm:space-y-8">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <div className="space-y-4 sm:space-y-6">
                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        1. GENERAL
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>This Service Agreement governs customer's purchase and use, in any manor, of all services, including but not limited to Cloud Gaming Services and Reseller services, as described in the Order Form, ordered by customer and accepted by Ant eSports Pvt. Ltd also known as Antcloud.co and describes the terms and conditions that apply to such purchase and conditions contained in this Agreement, the Addendum and any policy or guideline incorporated by reference at any time and from time to time in its sole discretion, and to determine whether and when any such changes apply to both existing or future customers. Any modifications will be effective upon posting of the revisions to our site.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        2. modifications
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud may post changes or modifications to be referenced policies ad guidelines without notice to you. Your continued use of the Services following Antcloud posting of any changes or modifications will constitute your acceptance of such changes or modifications. IF CUSTOMER DOES NOT AGREE TO THE TERMS OF ANY MODIFICATION, DO NOT CONTINUE TO USE THE SERVICES AND IMMEDIATELY NOTIFY Antcloud OF YOUR TERMINATION OF THIS AGREEMENT IN THE MANOR DESCRIBED BELOW.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        3. Initial Agreement Terms
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>This Agreement shall be for an "Initial Term" of active registration and subscription for all services except where specific terms are defined within services agreement – including but not limited to Cloud Gaming Services and Reseller services. Customer agrees to all terms and conditions of services provided by Antcloud beginning upon acceptance during signup process.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        4. Renewal of Agreement Terms
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>This agreement will be automatically renewed (the "Renewal Term") at the end of the Initial Term for the same period as the Initial Term unless you provide Antcloud with notice of termination either (a) at least thirty (30) days prior to the end of the Initial Term or the Renewal Term, whichever is then applicable.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        5. Account Setup
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Website signup process will setup your account and we and/or our payment partner(s) have screened the order(s) in case of fraud. It is your responsibility to provide us with correct information you are signing up under and other contact information.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        6. Fees and Payment Terms
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Initial payment is due upon activation of account. Activation takes effect on the date of receipt of payment and will be renewed automatically for identical successive periods per sales quotation, sales order or online pricing selected and approved by customer. Any changes to the customer's service package shall be billed accordingly.</li>
                                                            <li>User's plan expires on 00:00 hours on the date of expiry.</li>
                                                            <li>Accounts that are seven (7) days past due on remittance of payment will result in an automatic deletion</li>
                                                            <li>Antcloud may charge set up fees, recurring service fees, and other one-time fees for optional services and, if requested by you. Unless otherwise specified in any written offer or promotion, the Service Fees published on the Antcloud website for the particular brand of Service you ordered are applicable to all transactions between you and Antcloud. Antcloud may amend the Services and/or the Service Fees associated with any of the Services at any time and from time to time without notice to you.</li>
                                                            <li>If Antcloud does not receive payment, you agree to pay Antcloud all amounts due upon demand. Antcloud may charge you for a late payment fee equal to two point four percent (2.4%) on any overdue balance</li>
                                                            <li>Antcloud may, in its sole and exclusive discretion, immediately suspend or terminate your Services without notice to you if Payment Process fails.</li>
                                                            <li>You understand and agree that you are responsible for any and all network bandwidth, compute, hard-drive usage, and any other overage charges you incur for using the Services, even if such overages arise because your account is compromised or "hacked".</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        7. Privacy Policy
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud is committed to protecting any data that we collect concerning you. By using our services you agree to the use of the data that we collect in accordance with this Privacy Policy. All possible measures, steps &amp; procedures are adopted to stay-put towards the India Data Protection Legislation. at <a href="https://antcloud.co/privacyPolicy" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">https://www.antcloud.co/privacyPolicy.</a></li>
                                                            <li><b>Information Collected</b>: We do not provide the information collected from you to any third party for any reason what-so-ever. However, we do have to co-operate with law enforcement agencies authorized by the government if they do ask us about the contact details we have for you.</li>
                                                            <li><b>Information Use:</b> This information is used for billing and to provide service and support to our customers. We may also study this information to determine our customers needs and provide support for our customers. All reasonable precautions are taken to prevent unauthorised access to this information. This safeguard may require you to provide additional forms of identity should you wish to obtain information about your account details. Antcloud may email its monthly newsletter to the primary contact e-mail on file, but customers are able to opt out of this newsletter at any time.</li>
                                                            <li><b>Cookies:</b> Your Internet browser has the in-built facility for storing small text files – "cookies" – that hold information which allows a website to recognize your account. We use cookies to save your preferences and login information, and provide personalized functionality. You can reject cookies by changing your browser settings, but be aware that this will disable some of the functionality on the antcloud.co website.</li>
                                                            <li><b>Log Files:</b> We use IP addresses to analyze trends, administer our site and servers, track access, and gather broad demographic information for aggregate use. IP addresses are not linked to personally identifiable information. It is possible that personal information about a customer may be included in the log files due to the normal functions of IP addresses and Web browsing.</li>
                                                            <li><b>Disclosing Information: </b>We do not disclose any personal information obtained about you from this website to third parties. We may use the information to keep in contact with you and inform you of developments associated with our business. You will be given the opportunity to opt out from any mailing list or similar device.</li>
                                                            <li><b>Electronic Communication: </b>You will be asked to provide your email address to us during the signup process to be able to communicate with you and we also ask you to provide us with your actual postal address, telephone number &amp; fax number in order to check and verify the distance between the address mentioned &amp; the location of signup. This is an important part of the verification process we follow for each signup which we receive. Normally we send all our notifications through emails which we have for your account on our record.</li>
                                                            <li><b>Duration: </b>The information so provided by you during registration is kept in our records till the time you are our active customer.</li>
                                                            <li><b>Contacting Us: </b>If you have any questions about our Privacy Policy, or if you want to know what information we have collected about you, please email us at <a href="mailto:support@antcloud.co" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">support@antcloud.co</a>; You can also correct any factual errors in that information or require us to remove your details from any list under our control.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        8. Backups and Data Loss
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Your use of the service is at your sole risk. Antcloud is not responsible for files and data residing on your account**. You agree to take full responsibility for files and data transferred and to maintain all appropriate backup of files and data stored on Antcloud servers.</li>
                                                            <li>Antcloud automatically generate backups of all machines once every 24 hours, with weekly off site backups. Dedicated servers are not automatically backed up or protected. If loss of data occurs due to an error of Antcloud, we will attempt to recover the date for no charge to the client. If data loss occurs due to negligence of a client in securing their account or by an action of the client, Antcloud will attempt to recover the data from the most recent archive for an extra fee.</li>
                                                            <li>**Except where customer and Antcloud enter into a professional services agreement to provide data backup services or specific data protection services are included in the service for clients with hosted or out of datacenter computers and servers.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        9. Service Level Definitions
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud infrastructure is defined as Antcloud owned and operated infrastructure consisting of solely selected Antcloud equipment housed within a single Antcloud managed data center space.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        10. Support
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>All hosted products and services provided by Antcloud are supported directly by Antcloud or by a third party on Antcloud behalf. Customers are to reports issues and outages of supplied products and services directly to Antcloud and not to Antcloud suppliers or licensing companies</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        11. Acceptable Use Policy ("AUP")
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Customer represents that it has read antcloud.co's acceptable use policy ("AUP") and its privacy policy ("Privacy Policy"), currently posted at <a href="https://antcloud.co/privacyPolicy" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">https://www.antcloud.co/privacyPolicy</a>, respectively. The AUP and Privacy Policy are hereby incorporated into this Agreement, and both parties will adhere to each.</li>
                                                            <li>Without limiting the generality of the provisions of all Subsections above, Customer will not allow the Service or Antcloud equipment to be used for activities prohibited by the AUP. Third party violations of the AUP using Customer's Service, including any IP addresses, points of access to the Internet, systems, software, or equipment assigned to or belonging to Customer, will be considered violations by Customer.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        12. Zero Tolerance Spam Policy
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>We take a zero tolerance stance against sending of unsolicited e-mail, bulk emailing, and spam. "Safe lists" and "double opt-in" will be treated as spam. Any user who sends out spam will have their account terminated without notice.</li>
                                                            <li>Antcloud reserves the right to require changes or disable as necessary any web site, account, database, or other component that does not comply with this policy, at its sole discretion. Antcloud also reserves the right to make any such modifications in an emergency at our sole discretion.</li>
                                                            <li>Antcloud reserves the right to charge the holder of the account used to send any unsolicited e-mail a clean up fee. This cost of the clean up fee is left entirely to the discretion of Antcloud. All rights reserved.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        13. Content
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>You will not in any way use html, ASP, VB, .NET, java or perl code that will result unnecessary traffic nor will you install any client side applications that will result in excess traffic. The intent of Antcloud is to provide space to serve web documents, not as an off-site storage area for electronic files. You will also not misrepresent the site in such a way that will result in needless traffic. Some examples of unacceptable content or links include: pirated software, hacker programs or archives, Warez sites, Spamware, Copyrighted MP3s and IRC bots. Antcloud.co does not support; (i) sexually explicit, obscene or pornographic content (whether in text or graphics); (ii) speech or images that are offensive, profane, hateful, threatening, harmful, defamatory, libelous, harassing, discriminatory (whether based on race, ethnicity, creed, religion, gender, sexual orientation, physical disability or otherwise) or that promote any illegal activity; and/or (iii) graphic violence. We will terminate any account that does not conform to these requirements. Antcloud reserves the right to terminate any account, for any reason, without prior notice or warning.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        14. IP Addresses
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Internet Protocol Numbers ("IP numbers") provided or assigned by Antcloud in connection with the Services at all times remain the property of Antcloud and are not portable, and the Customer shall have no rights with respect thereto. Antcloud may "swap-out" any IP address assigned to your Service with another IP address at any time. Antcloud may revoke any Additional IP assigned to you for more than ninety (90) days if, at that time, you not are using at least 80% of your assigned IP addresses.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        15. Illegal activities
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Illegal activities, to include; unauthorized distribution or copying copyrighted software, violation of India export restrictions, harassment, fraud, trafficking in obscene material, and other illegal activities will be reported to all regulatory, administrative and/or governmental authorities. Antcloud.co reserves the right to report all such activities.</li>
                                                            <li>You are restricted from removing, modifying or obscuring any copyright, trademark or other proprietary rights notices that are contained in or on the Licensed Products.</li>
                                                            <li>You are prohibited from reverse engineering, decompiling, or disassembling the Licensed Products, except to the extent that such activity is expressly permitted by applicable law.</li>
                                                            <li>You are prohibited from modifying or deleting any intellectual property or software contained in the product. Doing so will result in your account getting permanently banned.</li>
                                                            <li>You are prohibited from sharing your account with any other individual(s), and/ or if any unauthorised access to the Website is noticed from your account, your account shall be permanently disabled on the Website and all future access denied.</li>
                                                            <li>Exploiting system resources for purposes other than intended, such as for unauthorized processing or data extraction, will result in a permanent ban on your account.</li>
                                                            <li>Using automated tools or bots to interact with the platform in any unauthorized manner will lead to an immediate and permanent ban on your account.</li>
                                                            <li>Engaging in unauthorized crypto mining on our platform is strictly prohibited. Any attempts to mine cryptocurrency will result in the permanent suspension of your account.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        16. Cancellation and Refunds
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud.co reserves the right to cancel the account at any time.</li>
                                                            <li>Customers may cancel at any time. Antcloud.co does not give any money back guarantee for its services</li>
                                                            <li>There are no refunds or money back guarantee on dedicated servers, including setup fees that may have been charged.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        17. Price Change
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>The amount you pay for services will not increase from the date of purchase until the end of the service agreement, unless upgrades in service are requested. Antcloud reserves the right to change prices listed on Antcloud.co, and the right to increase the amount of resources given to plans at any time.</li>
                                                            <li>Renewal of service agreements are subject to potential price increases due to software licensing increases, equipment &amp; dependent service cost increases. Customer will be made aware of increases before time of renewal and required to approve price escalations or terminate service agreement.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        18. Software Licensing
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Any software licenses obtained on Customer's behalf (such as licenses from the Microsoft Service Provider License Agreement "SPLA") are subject to price increases to match any increases made by the software manufacturer.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        19. Taxes
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud shall not be liable for any taxes or other fees to be paid in accordance with or related to purchase made from the customer or Antcloud servers. Customer also agrees to take full responsibility for all taxes and fees of any nature associated with any such products sold.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        20. Warranties and Disclaimer
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Customer expressly acknowledges and agrees that all use of the services is at customer's sole risk. Antcloud will not be responsible for any damages your business may suffer. Antcloud makes no warranties of any kind, expressed or implied for services provided. Antcloud disclaims any warranty or merchantability or fitness for a particular purpose. This includes loss of data resulting from delays, no deliveries, wrong delivery, and any and all service interruptions caused by Antcloud and its employees.</li>
                                                            <li>For those services for which Antcloud offers a system of credits or rebates for services interruptions, regardless of cause, such credits or rebates shall be Customer's sole remedy therefore.</li>
                                                            <li>For direct, proven damages arising out of its performance or failure to perform hereunder, Antcloud's liability shall be limited to an amount equivalent to the charges actually paid by Customer during the period, which such damages occur.</li>
                                                            <li>Notwithstanding the foregoing, neither Antcloud nor its affiliates, officers, directors, employees or agents shall be liable to Customer or to any third party for any direct, consequential, incidental, exemplary, or punitive losses or damages, including, without limitation, lost profits or data, regardless of the cause thereof, even if Antcloud is advised of the possibility of such loss.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        21. Indemnification
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Customer agrees that it shall defend, indemnify, save and hold Antcloud.co harmless from any and all demands, liabilities, losses, costs and claims, including reasonable attorney's fees asserted against Antcloud, its agents, its customers, officers and employees, that may arise or result from any service provided or performed or agreed to be performed or any product sold by customer, its agents, employees or assigns. Customer agrees to defend, indemnify and hold harmless Antcloud against liabilities arising out of; (1) any injury to person or property caused by any products sold or otherwise distributed in connection with Antcloud; (2) any material supplied by customer infringing or allegedly infringing on the proprietary rights of a third party; (3) copyright infringement and (4) any defective products sold to customers from Antcloud's server.</li>
                                                            <li>You agree that Antcloud's maximum liability to you under this agreement for all damages, losses, costs and causes of actions from any and all claims (whether in contract, tort or other legal theory) shall be limited to the lesser of (a) the total amount of service fees actually paid by you to Antcloud for the three month period immediately preceding the date on which the damage or loss occurred or the cause of action arose, (b) proven direct damages The terms of this Indemnification Section shall survive any termination of this Agreement.</li>
                                                            <li>AntCloud or Ant-E Sports Pvt Ltd provides information, tools, or services for users but does not guarantee uninterrupted access or compliance with third-party policies. By using AntCloud, you acknowledge and agree that we are not responsible for any actions taken by third-party services, including but not limited to suspensions, bans, or restrictions on your account on said third party services. Your use of any third-party service while accessing or utilizing AntCloud is at your own risk. We do not have control over or influence the decisions made by these services. Under no circumstances shall AntCloud or Ant-E Sports Pvt Ltd be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of third-party platforms. If you are concerned about compliance with any third-party terms, you are responsible for reviewing their policies before engaging with their services.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        22. Force Majeure
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Except for the obligation to make payments, neither party will be liable for any failure or delay in its performance under this Agreement due to any cause beyond its reasonable control, including, but not limited to, acts of war, acts of God, earthquake, flood, embargo, riot, sabotage, labor shortage or dispute, governmental act or failure of the Internet (not resulting from the actions or inaction´s of Antcloud), provided that the delayed party: (a) gives the other party prompt notice of such cause, and (b) uses its reasonable commercial efforts to promptly correct such failure or delay in performance. If Antcloud is unable to provide Service(s) for a period of thirty (30) consecutive days as a result of a continuing force majeure event, the Customer may cancel the Service(s), but there shall be no liability on the part of Antcloud.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        23. Assignment
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>The Customer may not assign its rights or delegate its duties under this Agreement either in whole or in part without the prior written consent of Antcloud, and any attempted assignment or delegation without such consent will be void. Antcloud may assign this Agreement in whole or part. Antcloud also may delegate the performance of certain Services to third parties, including Affiliates. This Agreement will bind and inure to the benefit of each party's successors and permitted assigns.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        24. Severability
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>In the event any provision of this Agreement is held by a tribunal of competent jurisdiction to be contrary to the law, the remaining provisions of this Agreement will remain in full force and effect. The waiver of any breach or default of this Agreement will not constitute a waiver of any subsequent breach or default, and will not act to amend or negate the rights of the waiving party.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        25. Relationship of Parties
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>This Agreement will not establish any relationship of partnership, joint venture, employment, franchise or agency between Antcloud and the Customer. Neither Antcloud nor the Customer will have the power to bind the other or incur obligations on the other's behalf without the other's prior written consent, except as otherwise expressly provided herein.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        26. Notices
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>It is your responsibility to provide accurate and complete account and contact information, including a valid e-mail address, to Antcloud during the Sign-up Process. It is also your responsibility to inform Antcloud promptly of any changes to your account or contact information. Antcloud has no responsibility for communications that are misdirected as a result of your failure to provide Antcloud with updated contact information or as a result of the suspension or termination of your Services.</li>
                                                            <li>Antcloud may provide notice to you required by this Agreement via e-mail at the address provided by you. You agree that notice to you at this address is deemed sufficient regardless of your receipt of such email. You must provide all notices to Antcloud required in writing to Antcloud, KHASRA NO. 522/1 VILLAGE JONAPUR NEW DELHI South Delhi DL 110030 IN or as changed by Antcloud via its on-line amendment of this Agreement.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        27. Governing Law &amp; Choice of Venue
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>This agreement and rights of the Parties hereunder shall be governed by and interpreted in accordance with the laws of the India, excluding its laws relating to conflict laws. The Parties agree that any appropriate state or district court located in New Delhi, India shall have exclusive jurisdiction over any case or controversy arising hereunder and shall be the proper forum in which to adjudicate such as case or controversy.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
                                                        28. Changes to the Polices and Terms of Service
                                                    </h4>
                                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                                                            <li>Antcloud reserves the right to revise its policies at any time without notice.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}