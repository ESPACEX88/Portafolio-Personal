import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-xl font-bold">
            <span className="gradient-text">José Posadas</span>
          </Link>
          <div className="flex gap-8 text-sm">
            <a href="#about" className="hover:text-blue-400 transition-colors">Sobre mí</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Habilidades</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Proyectos</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-blue-400 text-sm tracking-widest mb-4 uppercase opacity-0 animate-fade-in-up">
            Hola, soy
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up delay-100">
            <span className="gradient-text">José Posadas</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8 opacity-0 animate-fade-in-up delay-200">
            Desarrollador Full Stack & Creador de soluciones digitales
          </p>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up delay-300">
            Construyo aplicaciones web modernas y sistemas automatizados para resolver problemas diarios de empresas. 
            Apasionado por transformar ideas en realidad a través del código.
          </p>
          <div className="flex gap-4 justify-center opacity-0 animate-fade-in-up delay-400">
            <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all hover:scale-105">
              Ver Proyectos
            </a>
            <a href="#contact" className="px-8 py-3 border border-slate-700 hover:border-blue-400 text-slate-300 hover:text-white rounded-full font-medium transition-all">
              Contactar
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Sobre Mí</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 glow">
              <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden relative">
                <Image 
                  src="/foto-perfil.jpg" 
                  alt="Foto de perfil de José Posadas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Desarrollador apasionado por crear soluciones innovadoras
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Soy un desarrollador con 2 años de experiencia en el diseño y desarrollo de aplicaciones web modernas 
                y sistemas automatizados para empresas. Me especializo en crear experiencias de usuario intuitivas 
                y funcionales, así como en optimizar procesos empresariales a través de la automatización.
              </p>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Cuando no estoy codificando, me puedes encontrar explorando nuevas tecnologías, 
                contribuyendo a proyectos de código abierto, o compartiendo conocimiento con la comunidad.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">2+</div>
                  <div className="text-xs text-slate-500">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">10</div>
                  <div className="text-xs text-slate-500">Proyectos completados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-xs text-slate-500">Clientes satisfechos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="gradient-text">Habilidades</span>
          </h2>
          
          {/* Frontend */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML/CSS", "JavaScript"].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm hover:border-blue-500 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Backend */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Backend</h3>
            <div className="flex flex-wrap gap-3">
              {["Node.js", "Python", "PostgreSQL", "REST APIs", "Automatización", "SQL"].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm hover:border-purple-500 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-300">Herramientas</h3>
            <div className="flex flex-wrap gap-3">
              {["Git", "GitHub", "Docker", "VS Code", "Figma", "AWS", "Linux"].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm hover:border-pink-500 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="gradient-text">Mis Proyectos</span>
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Una selección de proyectos en los que he trabajado recientemente
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Plataforma de comercio electrónico completa con carrito de compras, 
                  pasarela de pagos y panel de administración.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">React</span>
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">Node.js</span>
                  <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded">MongoDB</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-green-600/20 to-teal-600/20 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dashboard Analytics</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Panel de análisis con visualizaciones en tiempo real, 
                  gráficos interactivos y exportación de datos.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">TypeScript</span>
                  <span className="text-xs px-2 py-1 bg-pink-600/20 text-pink-400 rounded">Chart.js</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Chat Application</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Aplicación de mensajería en tiempo real con salas privadas, 
                  emojis y notificaciones push.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">React</span>
                  <span className="text-xs px-2 py-1 bg-cyan-600/20 text-cyan-400 rounded">Socket.io</span>
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">Express</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>

            {/* Project 4 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Manager</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Aplicación de gestión de tareas con arrastrar y soltar, 
                  colaboración en equipo yrecordatorios.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">Vue.js</span>
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">Firebase</span>
                  <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded">Tailwind</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>

            {/* Project 5 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-4xl">🌐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Portfolio CMS</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Sistema de gestión de contenido para portafolios personales 
                  con editor visual y hosting integrado.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">PostgreSQL</span>
                  <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">Prisma</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>

            {/* Project 6 */}
            <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-amber-600/20 to-orange-600/20 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Aplicación móvil multiplataforma para seguimiento de hábitos 
                  con gamificación y estadísticas.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">React Native</span>
                  <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">Expo</span>
                  <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded">Redux</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Ver Demo →
                  </a>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">¿Trabajamos juntos?</span>
          </h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¿Quieres colaborar? No dudes en contactarme. 
            Siempre estoy abierto a nuevas oportunidades y desafíos.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a href="mailto:posadasjosep8@gmail.com" className="flex items-center gap-3 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 transition-all group">
              <span className="text-2xl">✉️</span>
              <div className="text-left">
                <div className="text-xs text-slate-500">Email</div>
                <div className="text-sm group-hover:text-blue-400 transition-colors">posadasjosep8@gmail.com</div>
              </div>
            </a>
            
            <a href="https://github.com/ESPACEX88" target="_blank" className="flex items-center gap-3 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 transition-all group">
              <span className="text-2xl">🐙</span>
              <div className="text-left">
                <div className="text-xs text-slate-500">GitHub</div>
                <div className="text-sm group-hover:text-purple-400 transition-colors">@ESPACEX88</div>
              </div>
            </a>
            
            <a href="https://linkedin.com/in/josé-posadas" target="_blank" className="flex items-center gap-3 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-600 transition-all group">
              <span className="text-2xl">💼</span>
              <div className="text-left">
                <div className="text-xs text-slate-500">LinkedIn</div>
                <div className="text-sm group-hover:text-blue-400 transition-colors">/in/José Posadas</div>
              </div>
            </a>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 José Posadas. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
