import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AvisoLegal: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="outline"
                    className="mb-8 gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Button>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-3xl font-bold text-gray-900">Aviso Legal</h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="space-y-6">
                                <div>

                                    <p className="mt-1 text-sm text-gray-700">
                                        Banx Not Banks informa a sus usuarios, aliados y al público en general que no es, por el momento, un banco, institución financiera ni entidad regulada conforme a las leyes bancarias, financieras o de valores, tanto locales como internacionales.

                                        Todos los servicios de naturaleza financiera —incluyendo, de manera enunciativa mas no limitativa, transacciones en moneda fiduciaria, servicios de tarjetas, billeteras digitales y pagos empresariales— se realizan exclusivamente a través de proveedores y socios estratégicos debidamente autorizados y regulados por las autoridades competentes en cada jurisdicción.

                                        Banx Not Banks actúa como plataforma tecnológica y ecosistema de licenciamiento creativo, cuyo objetivo es ofrecer herramientas digitales que faciliten la gestión, operación y monetización de activos y servicios en entornos digitales. En ningún caso, Banx Not Banks ofrece servicios bancarios, productos de inversión, instrumentos financieros regulados ni actividades reservadas a instituciones financieras.

                                        Todas las operaciones que involucren moneda fiduciaria, emisión de tarjetas, procesamiento de pagos o infraestructura bancaria son intermediadas, procesadas y supervisadas bajo los términos, condiciones y normativas de cumplimiento de las entidades asociadas autorizadas.

                                        Banx Not Banks mantiene un firme compromiso con las mejores prácticas de cumplimiento normativo (compliance), prevención de lavado de dinero (AML) y conocimiento del cliente (KYC), colaborando únicamente con proveedores que cumplen con las disposiciones aplicables en materia de regulación financiera, protección de datos y transparencia operativa.
                                    </p>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvisoLegal;