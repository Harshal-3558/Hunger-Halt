import RegisterPlant from './RegisterPlant';

const BioHome = () => {
  return (
    <div className="relative h-screen bg-[url('public/images/biogas-bg.png')] from-cyan-500 to-blue-500 bg-cover bg-center bg-no-repeat">
      {/* Navbar */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 opacity-75"></div> */}
      {/* <header className="absolute top-0 w-full flex justify-between items-center p-6 bg-transparent text-white">
        <div className="flex items-center">
          <div className="text-2xl font-bold"> 
            <span className="text-teal-500">Hunger</span> Halt
          </div>
        </div>
        <nav className="space-x-8">
          <a href="#" className="hover:text-teal-500">Home</a>
          <a href="#" className="hover:text-teal-500">Dashboard</a>
          <a href="#" className="hover:text-teal-500">Our Impact</a>
          <a href="#" className="hover:text-teal-500">Partnership</a>
        </nav>
      </header> */}
      {/* <div className='flex justify-between'>
        <h1>Hunger Halt</h1>
        <nav className='flex gap-2'>
          <div className=''>HOme</div>
          <div>home</div> 
          <div>and home</div>
        </nav>
      </div> */}
      {/* Main Section */}
      <div className="flex flex-col w-4/6 mx-28 justify-center h-full text-white ">
        {/* Slide indicator */}
        {/* <div className="flex space-x-2 items-center justify-center mb-6">
          <div className="h-1 w-6 bg-white"></div>
          <div className="h-1 w-24 bg-gray-500"></div>
          <div className="h-1 w-6 bg-white"></div>
        </div> */}

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Use The Leftover Food To Boost Your Biogas Generation
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl mb-8 max-w-3xl">
          Through our collaboration with leading biogas companies, surplus food that cannot be redistributed is transformed into clean energy, helping reduce landfill waste and lowering carbon emissions.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          {/* <button className="bg-teal-500 text-white py-2 px-7 hover:bg-teal-600 transition  rounded-3xl">
            Get Involved Now
          </button> */}
          <RegisterPlant/>
          <button className="bg-yellow-500 text-white py-2 px-7 hover:bg-yellow-600 transition rounded-3xl">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioHome;
