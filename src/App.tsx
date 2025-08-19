import './index.css'
import { Navbar } from './components/Navbar';
import { InputField_component } from './components/InputField_component';
import { Features_Overview_component } from './components/Features_Overview_component';
import { Datatable_component } from './components/Datatable_component';
import Footer from './components/Contact';
import Contact from './components/Contact';

function App() {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="space-y-8">

          <InputField_component />
          <Datatable_component />
          <Features_Overview_component />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;