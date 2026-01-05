import Image from 'next/image';

interface EmployeeProps {
  headshot: string;
  employee_name: string;
  yearsOfExperience: number;
  certification: string;
}

export default function Employee({
  headshot,
  employee_name,
  yearsOfExperience,
  certification,
}: EmployeeProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Headshot */}
      <div className="relative w-full aspect-square">
        <Image
          src={headshot}
          alt={employee_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      
      {/* Employee Info */}
      <div className="p-6">
        <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">
          {employee_name}
        </h3>
        <p className="font-raleway text-sm text-earle-black mb-1">
          <span className="font-medium">{yearsOfExperience} years</span> of experience
        </p>
        <p className="font-raleway text-sm text-earle-black">
          {certification}
        </p>
      </div>
    </div>
  );
}

