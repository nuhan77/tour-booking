import React from "react";

function TermsAndConditions() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Terms and Conditions
        </h1>
        <div className="text-gray-700 space-y-4">
          <p>
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern [Your Company Name]'s relationship with you in
            relation to this website.
          </p>
          <p>
            The term ‘[Your Company Name]’ or ‘us’ or ‘we’ refers to the owner
            of the website whose registered office is [address]. The term ‘you’
            refers to the user or viewer of our website.
          </p>
          <h2 className="text-xl font-semibold">Use of the Website</h2>
          <p>
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </p>
          <h2 className="text-xl font-semibold">User Conduct</h2>
          <p>
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense.
          </p>
          <h2 className="text-xl font-semibold">Governing Law</h2>
          <p>
            Your use of this website and any dispute arising out of such use of
            the website is subject to the laws of [Country].
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
