import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function Privacidade() {
  return (
    <>
      <div className="bg-mara-dark">
        <Navbar />
      </div>

      <main className="pt-32 pb-24 bg-mara-dark min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Política de <span className="text-mara-orange">Privacidade</span>
            </h1>
            <p className="text-gray-400">Última atualização: 1 de Outubro de 2024</p>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed text-lg">
            
            <section>
              <p className="mb-4">
                A sua privacidade é importante para nós. É política do Estúdio Mara Passos respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Estúdio Mara Passos, e outros sites que possuímos e operamos.
              </p>
              <p className="mb-4">
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço, como no agendamento de aulas experimentais. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
              </p>
              <p className="mb-4">
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
              </p>
              <p className="mb-4">
                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
              </p>
              <p className="mb-4">
                O nosso site pode ter links para sites externos que não são operados por nós (como nossas redes sociais). Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
              </p>
              <p className="mb-4">
                Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados (como retornar o seu contato).
              </p>
              <p>
                O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mara-orange mb-4 mt-8">Compromisso do Usuário</h2>
              <p className="mb-4">
                O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Estúdio Mara Passos oferece no site e com caráter enunciativo, mas não limitativo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
                <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Estúdio Mara Passos, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mara-orange mb-4 mt-8">Coleta de Dados Pessoais</h2>
              <p className="mb-4">
                No Estúdio Mara Passos, coletamos informações pessoais de forma justa e transparente, sempre com o consentimento do usuário. As informações coletadas através dos nossos formulários incluem:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone (WhatsApp)</li>
                <li>Instrumento ou curso de interesse</li>
              </ul>
              <p className="mb-4">
                Essas informações são coletadas com o único propósito de contatar os usuários sobre seus interesses em aulas no Estúdio Mara Passos. Os dados coletados são armazenados de forma segura e protegidos contra acesso não autorizado. Mantemos as informações pelo tempo necessário para os fins descritos nesta política, ou conforme exigido por lei.
              </p>
              <p>
                Você pode, a qualquer momento, solicitar a exclusão ou atualização de suas informações pessoais, entrando em contato diretamente conosco através de nossos canais de atendimento (telefone ou e-mail).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mara-orange mb-4 mt-8">Finalidades da Coleta de Dados</h2>
              <p className="mb-4">
                Os dados coletados podem ser utilizados para os seguintes propósitos:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Agendar aulas experimentais e retornar o contato solicitado pelo usuário;</li>
                <li>Enviar informações e tirar dúvidas sobre os cursos oferecidos;</li>
                <li>Cumprir com obrigações legais e regulatórias.</li>
              </ul>
              <p>
                A sua privacidade e segurança são prioridade, e tomamos todas as medidas necessárias para garantir que seus dados sejam tratados de acordo com as melhores práticas de proteção e conformidade legal.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}