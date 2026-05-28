import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Integrity Fitness Education",
  description: "Read the full Terms & Conditions for Integrity Fitness Education — enrolment, cancellation, intellectual property, and your rights as a learner.",
  openGraph: {
    title: "Terms & Conditions | Integrity Fitness Education",
    description: "Full Terms & Conditions for Integrity Fitness Education personal trainer courses — enrolment, cancellation, and learner rights.",
    url: "https://www.integrityfitnesseducation.co.uk/terms",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
  },
};

function Section({ number, title, children }: { number?: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-3 mb-1">
        {number && (
          <span className="text-gray-900 text-sm font-bold tracking-widest">{number}</span>
        )}
        <h2 className="text-gray-900 text-xl font-bold uppercase tracking-wide">{title}</h2>
      </div>
      <div className="w-8 h-0.5 bg-[#CE1A19] mb-6" />
      <div className="space-y-4 text-gray-700 text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Sub({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="text-gray-900 text-sm font-semibold flex-shrink-0 mt-0.5">{id}</span>
      <p className="text-gray-700 text-base leading-relaxed">{children}</p>
    </div>
  );
}

export default function TermsAndConditions() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-40 pb-20 border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-gray-500 text-xs font-semibold tracking-[4px] uppercase mb-4">
            Legal
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 uppercase leading-none tracking-tight">
            Terms &amp; Conditions
          </h1>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
          <p className="text-gray-500 text-sm mt-6">
            Last updated: 2024 &nbsp;·&nbsp; Integrity Fitness Education Ltd · Company No. 13487683
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          {/* Preamble */}
          <div className="mb-12 p-8 border border-gray-200 bg-gray-50">
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              This agreement applies as between you, the User of this Website and Integrity Fitness
              Education LTD, the owner(s) of this Website. Your agreement to comply with and be
              bound by clauses 1, 2, 4–11 and 15–25 of these terms and conditions is deemed to
              occur upon your first use of the website. Clauses 3 and 12–14 apply only to the sale
              of services.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              If you do not agree to be bound by these terms and conditions, you should stop using
              the Website immediately. No part of this Website is intended to constitute a
              contractual offer capable of acceptance. Your order constitutes a contractual offer
              and our acceptance of that offer is deemed to occur upon our sending a confirmation
              email to you indicating that your order has been accepted.
            </p>
          </div>

          <Section number="1." title="Definitions and Interpretation">
            <p>In this agreement the following terms shall have the following meanings:</p>
            <div className="space-y-3 mt-4">
              {[
                ["Account", "means collectively the personal information, payment information and credentials used by users to access paid content and/or any communications system on the website."],
                ["Content", "means any text, graphics, images, audio, video, software, data compilations and any other form of information capable of being stored in a computer that appears on or forms part of this website."],
                ["Facilities", "means collectively any online facilities, tools, services or information that Integrity Fitness Education LTD makes available through the website either now or in the future."],
                ["Services", "means the services available to you through this website, specifically use of Integrity Fitness Education's proprietary e-learning platform."],
                ["Payment Information", "means any details required for the purchase of services from this website. This includes, but is not limited to, credit/debit card numbers, bank account numbers and sort codes."],
                ["System", "means any online communications infrastructure that Integrity Fitness Education LTD makes available through the website either now or in the future. This includes, but is not limited to, web-based email, message boards, live chat facilities and email links."],
                ["User / Users", "means any third party that accesses the website and is not employed by Integrity Fitness Education LTD and acting in the course of their employment."],
                ["Website", "means the website that you are currently using (www.integrityfitness.education) and any sub-domains of this site unless expressly excluded by their own terms and conditions."],
                ["We/Us/Our", "means Integrity Fitness Education LTD, a company incorporated with the Registrar of Companies for England with company registration number 13487683."],
              ].map(([term, def]) => (
                <div key={term} className="flex gap-3">
                  <span className="text-gray-900 font-semibold flex-shrink-0 min-w-[140px]">{term}:</span>
                  <span className="text-gray-700">{def}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section number="2." title="Age Restrictions">
            <p>
              Persons under the age of 16 should use this Website only with the supervision of an
              adult. Payment information must be provided by or with the permission of an adult.
            </p>
          </Section>

          <Section number="3." title="Business Customers">
            <p>
              These terms and conditions also apply to customers procuring services in the course
              of business.
            </p>
          </Section>

          <Section number="4." title="Intellectual Property">
            <Sub id="4.1">
              Subject to the exceptions in clause 5, all content included on the website, unless
              uploaded by users, including but not limited to text, graphics, logos, icons, images,
              sound clips, video clips, data compilations, page layout, underlying code and software
              is the property of Integrity Fitness Education LTD, our affiliates or other relevant
              third parties. By continuing to use the website you acknowledge that such material is
              protected by applicable United Kingdom and international intellectual property and
              other laws.
            </Sub>
            <Sub id="4.2">
              Subject to clause 6 you may not reproduce, copy, distribute, store or in any other
              fashion re-use material from the website unless otherwise indicated on the website or
              unless given our express written permission to do so.
            </Sub>
            <Sub id="4.3">
              As such, you cannot claim to be an IFE certified trainer (e.g. putting this in your
              social media profiles) without express permission from us. If you successfully
              complete the combined diploma, your certificate serves as express permission.
            </Sub>
          </Section>

          <Section number="5." title="Third Party Intellectual Property">
            <Sub id="5.1">
              Unless otherwise expressly indicated, all intellectual property rights including but
              not limited to Copyright and Trademarks, in product images and descriptions belong to
              the manufacturers or distributors of such products as may be applicable.
            </Sub>
            <Sub id="5.2">
              Subject to clause 6 you may not reproduce, copy, distribute, store or in any other
              fashion re-use such material unless otherwise indicated on the website or unless given
              express written permission to do so by the relevant manufacturer or supplier.
            </Sub>
          </Section>

          <Section number="6." title="Fair Use of Intellectual Property">
            <p>
              Material from the website may be re-used without written permission where any of the
              exceptions detailed in chapter III of the Copyright Designs and Patents Act 1988 apply.
            </p>
          </Section>

          <Section number="7." title="Links to Other Websites">
            <p>
              This website may contain links to other sites. Unless expressly stated, these sites
              are not under the control of Integrity Fitness Education LTD or that of our
              affiliates. We assume no responsibility for the content of such websites and disclaim
              liability for any and all forms of loss or damage arising out of the use of them. The
              inclusion of a link to another site on this website does not imply any endorsement of
              the sites themselves or of those in control of them.
            </p>
          </Section>

          <Section number="8." title="Links to This Website">
            <p>
              Those wishing to place a link to this website on other sites may do so only to the
              home page of the site www.integrityfitness.education without our prior permission.
              Deep linking (i.e. links to specific pages within the site) requires our express
              written permission. To find out more please contact us by email at{" "}
              <a href="mailto:harry@integrityfitness.education" className="text-gray-900 underline hover:text-gray-600">
                harry@integrityfitness.education
              </a>{" "}
              or call us on{" "}
              <a href="tel:+447795033958" className="text-gray-900 underline hover:text-gray-600">
                +44 779 5033 958
              </a>
              .
            </p>
          </Section>

          <Section number="9." title="Use of Communications Facilities">
            <Sub id="9.1">
              When using any system on the website you should do so in accordance with the
              following rules. Failure to comply with these rules may result in your account being
              suspended or closed:
            </Sub>
            <div className="pl-8 space-y-3">
              {[
                ["9.1.1", "You must not use obscene or vulgar language."],
                ["9.1.2", "You must not submit content that is unlawful or otherwise objectionable. This includes, but is not limited to, content that is abusive, threatening, harassing, defamatory, ageist, sexist, homophobic, transphobic, ableist, fat-phobic or racist."],
                ["9.1.3", "You must not submit content that is intended to promote or incite violence."],
                ["9.1.4", "It is advised that submissions are made using the English language as we may be unable to respond to enquiries submitted in any other languages."],
                ["9.1.5", "The means by which you identify yourself must not violate these terms and conditions or any applicable laws."],
                ["9.1.6", "You must not impersonate other people, particularly employees and representatives of Integrity Fitness Education LTD or our affiliates."],
                ["9.1.7", "You must not use our system for unauthorised mass-communication such as 'spam' or 'junk mail'."],
              ].map(([id, text]) => (
                <Sub key={id} id={id}>{text}</Sub>
              ))}
            </div>
            <Sub id="9.2">
              You acknowledge that Integrity Fitness Education LTD reserves the right to monitor
              any and all communications made to us or using our system.
            </Sub>
            <Sub id="9.3">
              You acknowledge that Integrity Fitness Education LTD may retain copies of any and
              all communications made to us or using our system.
            </Sub>
            <Sub id="9.4">
              You acknowledge that any information you send to us through our system may be
              modified by us in any way and you hereby waive your moral right to be identified as
              the author of such information. Any restrictions you may wish to place upon our use
              of such information must be communicated to us in advance and we reserve the right to
              reject such terms and associated information.
            </Sub>
          </Section>

          <Section number="10." title="Accounts">
            <Sub id="10.1">
              In order to procure services on this website and to use certain other parts of the
              system, you are required to create an account which will contain certain personal
              details and payment information. By continuing to use this website you represent and
              warrant that all information you submit is accurate and truthful, you have permission
              to submit payment information where required, and you will keep this information
              accurate and up-to-date.
            </Sub>
            <Sub id="10.2">
              It is recommended that you do not share your account details, particularly your
              username and password. We accept no liability for any losses or damages incurred as
              a result of your account details being shared by you.
            </Sub>
            <Sub id="10.3">
              If you have reason to believe that your account details have been obtained by another
              person without consent, you should contact us immediately to suspend your account and
              cancel any unauthorised orders or payments that may be pending.
            </Sub>
            <Sub id="10.4">
              When choosing your username you are required to adhere to the terms set out above in
              clause 9. Any failure to do so could result in the suspension and/or deletion of your
              account.
            </Sub>
          </Section>

          <Section number="11." title="Termination and Cancellation of Accounts">
            <Sub id="11.1">
              Either Integrity Fitness Education LTD or you may terminate your account. If we
              terminate your account, you will be notified by email and an explanation for the
              termination will be provided. Notwithstanding the foregoing, we reserve the right to
              terminate without giving reasons.
            </Sub>
            <Sub id="11.2">
              If we terminate your account, any current or pending orders or payments on your
              account will be cancelled and provision of services will not commence.
            </Sub>
          </Section>

          <Section number="12." title="Services, Pricing and Availability">
            <Sub id="12.1">
              Whilst every effort has been made to ensure that all general descriptions of services
              correspond to the actual services that will be provided to you, we are not responsible
              for any variations from these descriptions as the exact nature of the services may
              vary depending on your individual requirements and circumstances.
            </Sub>
            <Sub id="12.2">Where appropriate, you may be required to select the required plan of services.</Sub>
            <Sub id="12.3">
              We neither represent nor warrant that such services will be available at all times
              and cannot necessarily confirm availability until confirming your order.
            </Sub>
            <Sub id="12.4">
              All pricing information on the website is correct at the time of going online. We
              reserve the right to change prices and alter or remove any special offers from time
              to time and as necessary.
            </Sub>
            <Sub id="12.5">
              In the event that prices are changed during the period between an order being placed
              and us processing that order, then the price that was valid at the time of the order
              shall be used.
            </Sub>
          </Section>

          <Section number="13." title="Orders and Provision of Services">
            <Sub id="13.1">
              No part of this website constitutes a contractual offer capable of acceptance. Your
              order constitutes a contractual offer that we may, at our sole discretion, accept.
              Our acceptance is indicated by us sending to you an order confirmation email.
            </Sub>
            <Sub id="13.2">
              Order confirmations will be sent to you before the services begin and shall contain
              confirmation of the services ordered, fully itemised pricing, relevant times and
              dates, and user credentials for accessing those services.
            </Sub>
            <Sub id="13.3">
              If we, for any reason, do not accept your order, no payment shall be taken under
              normal circumstances. In any event, any sums paid by you in relation to that order
              will be refunded within 14 calendar days.
            </Sub>
            <Sub id="13.4">
              Payment for the services shall be taken via your chosen payment method, immediately
              for any setup fee and at the same day of each subsequent month for charges accrued
              during the previous billing cycle.
            </Sub>
            <Sub id="13.5">
              We aim to fulfil your order within 2–3 working days or, if not, within a reasonable
              period following your order, unless there are exceptional circumstances.
            </Sub>
            <Sub id="13.6">
              Integrity Fitness Education LTD shall use all reasonable endeavours to provide the
              services with reasonable skill and care, commensurate with best trade practice.
            </Sub>
            <Sub id="13.7">
              In the event that services are provided that are not in conformity with your order,
              you should contact us immediately. We will ensure that any necessary corrections are
              made within five (5) working days.
            </Sub>
            <Sub id="13.8">
              Integrity Fitness Education provides technical support via our online support forum
              and/or phone. We make every effort to respond to support requests within 1 business
              day during European business hours (10am to 6pm GMT/BST), but we do not guarantee a
              particular response time.
            </Sub>
            <Sub id="13.9">
              If you are found to be acting in a manner that is not in accordance with the brand
              and ethical values of Integrity Fitness Education, or you are in breach of the
              student code of conduct, we reserve the right to revoke your title of IFE Certified
              Trainer and to prevent you from taking examinations which would give this status.
            </Sub>
            <Sub id="13.10">
              When paying for a course monthly, all payments must be continued whilst appropriate
              learning and progression can be provided by the centre, up to a hard deadline of 36
              months after initial sign-up date. If paying annually, this provides 12 months to
              study and qualify. If more time is needed, the learner may pay monthly for the
              additional period. No partial refunds are available on annual payments where the
              qualification is completed in under 12 months.
            </Sub>
          </Section>

          <Section number="14." title="Cancellation of Orders and Services">
            <p>
              To speak to us about your order, contact us on{" "}
              <a href="tel:+447795033958" className="text-gray-900 underline hover:text-gray-600">+44 77 9503 3958</a>
              {" "}or by email at{" "}
              <a href="mailto:harry@integrityfitness.education" className="text-gray-900 underline hover:text-gray-600">
                harry@integrityfitness.education
              </a>
              .
            </p>
            <Sub id="14.1">
              If you are a consumer based within the European Union, you have a statutory right to
              a "cooling off" period of 14 calendar days from the date your order is confirmed. To
              cancel within this period, please email{" "}
              <a href="mailto:harry@integrityfitness.education" className="text-gray-900 underline hover:text-gray-600">
                harry@integrityfitness.education
              </a>
              .
            </Sub>
            <Sub id="14.2">
              If the services begin within the cooling off period at your express request, you
              acknowledge that your cancellation rights will be affected proportionally to the
              course material consumed.
            </Sub>
            <Sub id="14.3">
              Cancellation of services after the 14-calendar day cooling off period has elapsed
              shall be subject to the specific terms governing those services and may be subject to
              a minimum contract duration.
            </Sub>
            <Sub id="14.4">After the 14-day cooling off period, all courses will be ineligible for refunds.</Sub>
            <Sub id="14.5">All deposits are strictly non-refundable.</Sub>
            <Sub id="14.6">
              Money back guarantees strictly apply to the courses on which they are advertised. If
              you request a refund you will lose access to the course material.
            </Sub>
          </Section>

          <Section number="15." title="Privacy">
            <p>
              Use of the website is also governed by our{" "}
              <Link href="/privacy-policy" className="text-gray-900 underline hover:text-gray-600">
                Privacy Policy
              </Link>
              {" "}which is incorporated into these Terms and Conditions by this reference.
            </p>
          </Section>

          <Section number="16." title="How We Use Your Personal Information">
            <Sub id="16.1">
              All personal information that we may collect will be collected, used and held in
              accordance with the provisions of the General Data Protection Regulation 2016/679
              (GDPR) and your rights under that legislation.
            </Sub>
            <Sub id="16.2">
              We may use your personal information to provide our services to you, process your
              payment for the services, and inform you of new products and services available from
              us. You may request that we stop sending you this information at any time.
            </Sub>
            <Sub id="16.3">
              In certain circumstances, and with your consent, we may pass your personal
              information on to credit reference agencies. These agencies are also bound by the
              GDPR.
            </Sub>
            <Sub id="16.4">
              We will not pass on your personal information to any other third parties without
              first obtaining your express permission.
            </Sub>
          </Section>

          <Section number="17." title="Disclaimers">
            <Sub id="17.1">
              We make no warranty or representation that the website will meet your requirements,
              that it will be of satisfactory quality, that it will be fit for a particular purpose,
              that it will not infringe the rights of third parties, that it will be compatible with
              all systems, that it will be secure and that all information provided will be accurate.
            </Sub>
            <Sub id="17.2">No part of this website is intended to constitute a contractual offer capable of acceptance.</Sub>
            <Sub id="17.3">
              Whilst we use reasonable endeavours to ensure that the website is secure and free of
              errors, viruses and other malware, you are strongly advised to take responsibility
              for your own internet security, that of your personal details and your computers.
            </Sub>
          </Section>

          <Section number="18." title="Changes to These Terms and Conditions">
            <p>
              We reserve the right to change the website, its content or these terms and conditions
              at any time. You will be bound by any changes to the terms and conditions from the
              first time you use the website following the changes.
            </p>
          </Section>

          <Section number="19." title="Availability of the Website">
            <Sub id="19.1">
              The website is provided "as is" and on an "as available" basis. We give no warranty
              that the website or facilities will be free of defects and/or faults and we do not
              provide any kind of refund for outages.
            </Sub>
            <Sub id="19.2">
              We accept no liability for any disruption or non-availability of the website resulting
              from external causes including, but not limited to, ISP equipment failure, host
              equipment failure, communications network failure, power failure, natural events, acts
              of war or legal restrictions and censorship.
            </Sub>
          </Section>

          <Section number="20." title="Limitation of Liability">
            <Sub id="20.1">
              To the maximum extent permitted by law, we accept no liability for any direct or
              indirect loss or damage, foreseeable or otherwise, including any indirect,
              consequential, special or exemplary damages arising from the use of the website or
              any information contained therein.
            </Sub>
            <Sub id="20.2">
              Nothing in these terms and conditions excludes or restricts Integrity Fitness
              Education's liability for death or personal injury resulting from any negligence or
              fraud on the part of Integrity Fitness Education LTD.
            </Sub>
            <Sub id="20.3">
              Nothing in these Terms and Conditions excludes or restricts Integrity Fitness
              Education LTD's liability for any direct or indirect loss or damage arising out of
              the incorrect provision of services or out of reliance on incorrect information
              included on the website.
            </Sub>
            <Sub id="20.4">
              In the event that any of these terms are found to be unlawful, invalid or otherwise
              unenforceable, that term is to be deemed severed from these terms and conditions and
              shall not affect the validity and enforceability of the remaining terms and conditions.
            </Sub>
          </Section>

          <Section number="21." title="No Waiver">
            <p>
              In the event that any party to these terms and conditions fails to exercise any right
              or remedy contained herein, this shall not be construed as a waiver of that right or
              remedy.
            </p>
          </Section>

          <Section number="22." title="Previous Terms and Conditions">
            <p>
              In the event of any conflict between these terms and conditions and any prior versions
              thereof, the provisions of these terms and conditions shall prevail unless it is
              expressly stated otherwise.
            </p>
          </Section>

          <Section number="23." title="Third Party Rights">
            <p>
              Nothing in these terms and conditions shall confer any rights upon any third party.
              The agreement created by these terms and conditions is between you and Integrity
              Fitness Education LTD.
            </p>
          </Section>

          <Section number="24." title="Communications">
            <Sub id="24.1">
              All notices and communications shall be given to us either by post to our premises or
              by email to{" "}
              <a href="mailto:harry@integrityfitness.education" className="text-gray-900 underline hover:text-gray-600">
                harry@integrityfitness.education
              </a>
              . Such notice will be deemed received 3 days after posting if sent by first class
              post, the day of sending if the email is received in full on a business day, and on
              the next business day if the email is sent on a weekend or public holiday.
            </Sub>
            <Sub id="24.2">
              We may from time to time, if you opt to receive it, send you information about our
              products and/or services. If you do not wish to receive such information, please click
              on the 'Unsubscribe' link in any email which you receive from us.
            </Sub>
          </Section>

          <Section number="25." title="Law and Jurisdiction">
            <p>
              These terms and conditions and the relationship between you and Integrity Fitness
              Education LTD shall be governed by and construed in accordance with the Law of England
              and Wales and both parties agree to submit to the exclusive jurisdiction of the United
              Kingdom.
            </p>
          </Section>

          {/* Company details */}
          <div className="border-t border-gray-200 pt-12 mt-4 space-y-1">
            <p className="text-gray-900 font-semibold">Integrity Fitness Education Ltd</p>
            <p className="text-gray-700 text-sm">Company No. 13487683</p>
            <p className="text-gray-700 text-sm">Registered office: 22 Oval Avenue, Norwich, England, NR5 0DP</p>
            <p className="text-gray-700 text-sm mt-4">
              <a href="mailto:harry@integrityfitness.education" className="text-gray-900 underline hover:text-gray-600">
                harry@integrityfitness.education
              </a>
              {" "}·{" "}
              <a href="tel:+447795033958" className="text-gray-900 underline hover:text-gray-600">
                +44 779 5033 958
              </a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
