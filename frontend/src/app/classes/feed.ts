export class Feed {
  idCard: string | undefined;
  title: string = '';
  description: string = '';
  createdAt: string | undefined;
  updatedAt: string | undefined;
  qualification: Number = 0;
  score: Number = 0;
  idWorkflow: string | undefined;
  idAssignees: string | undefined;
  path_image: string | undefined;
  status: Boolean = true;
  image_preview: any = undefined;
  image_base64: any = undefined;
}
