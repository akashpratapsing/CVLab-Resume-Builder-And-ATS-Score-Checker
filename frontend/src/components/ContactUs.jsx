const ContactUs = () => {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
          <div className="card w-full max-w-2xl bg-base-100  shadow-xl p-6 rounded-2xl">
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>
        <p className="text-center text-gray-500 mb-6">
          Have any questions or need support? Reach out to us!
        </p>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              placeholder="Write your message here..."
              className="textarea textarea-bordered w-full h-24"
            ></textarea>
          </div>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
      </div>
    );
  };
  
  export default ContactUs;
  