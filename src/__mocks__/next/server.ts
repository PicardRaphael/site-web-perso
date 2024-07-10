export class NextResponse {
  static next() {
    return 'NextResponse.next';
  }

  static redirect(url: URL) {
    return `NextResponse.redirect to ${url}`;
  }
}

export class NextRequest {
  nextUrl: { pathname: string };
  url: string;

  constructor(url: string) {
    this.url = url;
    this.nextUrl = { pathname: '' };
  }
}
