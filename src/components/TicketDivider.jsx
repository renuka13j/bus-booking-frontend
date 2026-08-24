function TicketDivider() {
  return (
    <div className="relative flex items-center my-2">
      <div className="absolute -left-8 w-4 h-4 bg-navy-950 rounded-full" />
      <div className="w-full border-t border-dashed border-navy-700" />
      <div className="absolute -right-8 w-4 h-4 bg-navy-950 rounded-full" />
    </div>
  );
}

export default TicketDivider;