import TermsOfServicePage, { generateMetadata as termsMetadata } from "../terms-of-service/page";

export const revalidate = 60;

export async function generateMetadata() {
  return termsMetadata();
}

export default TermsOfServicePage;
