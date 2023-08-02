import Testimonials from "@/partials/Testimonials";
import { getListPage } from "@/lib/contentParser";

const Courses = async () => {
  const testimonial1 = getListPage("sections/ComputerScience2.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");
  return (
    <>
      <div className="flex flex-col gap-y-5 p-3">
        <Testimonials data={testimonial1} />
        <Testimonials data={testimonial2} />
        <Testimonials data={testimonial3} />





const Courses = () => {
  const testimonial1 = getListPage("sections/ComputerScience.md");
  const testimonial2 = getListPage("sections/Math.md");
  const testimonial3 = getListPage("sections/Other.md");
  return (
<>
      <PageHeader title="קורסים" />
      <h3 className="text-center m-4">קורסי מתמטיקה</h3>
      <div className="flex justify-center p-6">
      <CourseCard
        title="1 אלגברה"
        explanation="אלגברה לינארית 1"
        link="Algebra1"
      />
      <CourseCard
        title="אינפי"
        explanation="חשבון אינפיניטסימלי 1"
        link="Infi1"
      />
      <CourseCard
        title="מתמטיקה בדידה"
        explanation="קורס במתמטיקה בדידה"
        link="Bdida"
      />
      </div>

      <h3 className="text-center m-4">קורסי מדעי המחשב</h3>
      <div className="flex justify-center p-6">
      <CourseCard
        title="מבוא למדעי המחשב"
        explanation="מבוא למדעי המחשב ושפת ג'אווה"
        link="IntroductionToComputerScience"
      />
      <CourseCard
        title="אלגוריתמים"
        explanation="קורס אלגוריתמים"
        link="Algorithms"
      />
      <CourseCard
        title="מבני נתונים"
        explanation="מבני נתונים ומבוא לאלגוריתמים"
        link="DataStructures"
      />
      </div>
      <h3 className="text-center m-4">קורסים נוספים</h3>
      <div className="flex justify-center p-6">
      <CourseCard
        title="כריית מידע"
        explanation="קורס בכריית מידע"
        link="DataMining"
      />
      <CourseCard
        title="גרפיקה ממוחשבת"
        explanation="קורס בגרפיקה ממוחשבת"
        link="ComputerGraphics"
      />
      <CourseCard
        title="ג'אווה מתקדם"
        explanation="תכנות מתקדם בשפת ג'אווה"
        link="AdvancedJava"
      />
      </div>
    </>
  );
};

export default Courses;
